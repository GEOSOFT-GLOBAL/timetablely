import { getAuthenticatedClient } from "@/config/axios";

/**
 * Workspace transport.
 *
 * ../service has no workspace model yet, so every call here resolves against
 * local persistence instead. The endpoint paths and payload shapes below are
 * the contract the server should implement — when it does, set
 * `SERVER_BACKED` to true and nothing above this file has to change.
 *
 * What local mode can and cannot do is worth being precise about: a workspace
 * created in this browser can be joined from this browser, because the code
 * is in the device registry. An invite code from a colleague cannot resolve
 * until the server exists, and `joinWorkspace` says so rather than pretending.
 */

const SERVER_BACKED = false;

export const workspaceEndpoints = {
  /** POST { name } -> Workspace */
  create: "/workspaces",
  /** POST { code } -> Workspace */
  join: "/workspaces/join",
  /** GET -> Workspace[] */
  list: "/workspaces",
  /** POST { email, role } -> WorkspaceInvite */
  invites: (workspaceId: string) => `/workspaces/${workspaceId}/invites`,
  /** DELETE -> void */
  invite: (workspaceId: string, code: string) =>
    `/workspaces/${workspaceId}/invites/${code}`,
  /** DELETE -> void */
  member: (workspaceId: string, memberId: string) =>
    `/workspaces/${workspaceId}/members/${memberId}`,
} as const;

export type WorkspaceRole = "admin" | "member" | "viewer";

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  role: WorkspaceRole;
  joinedAt: string;
}

export interface WorkspaceInvite {
  code: string;
  email?: string;
  role: WorkspaceRole;
  createdAt: string;
  acceptedAt?: string;
}

export interface Workspace {
  id: string;
  name: string;
  /** The code a colleague enters to join. Shared as a link or on its own. */
  inviteCode: string;
  ownerId: string;
  createdAt: string;
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
}

export interface WorkspaceActor {
  id: string;
  name: string;
  email: string;
}

/** Thrown for problems worth showing the user verbatim. */
export class WorkspaceError extends Error {}

/** How a company user arrives at a workspace: they make one or join one. */
export type WorkspaceIntent = "create" | "join";

export interface WorkspaceChoice {
  intent: WorkspaceIntent;
  name: string;
  inviteCode: string;
}

export const emptyWorkspaceChoice: WorkspaceChoice = {
  intent: "create",
  name: "",
  inviteCode: "",
};

/** Enough to be a real code; the server has the final say. */
export const isUsableInviteCode = (code: string) =>
  code.trim().replace(/[\s-]/g, "").length >= 6;

const REGISTRY_KEY = "timetablely-workspace-registry";

/** Every workspace this device has seen, so local joins can resolve a code. */
const readRegistry = (): Workspace[] => {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Workspace[]) : [];
  } catch {
    return [];
  }
};

const writeRegistry = (workspaces: Workspace[]) => {
  try {
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(workspaces));
  } catch {
    // A full or blocked storage is not worth failing the action over.
  }
};

const upsertRegistry = (workspace: Workspace) => {
  const registry = readRegistry();
  const index = registry.findIndex((entry) => entry.id === workspace.id);
  if (index >= 0) registry[index] = workspace;
  else registry.push(workspace);
  writeRegistry(registry);
};

/** Unambiguous alphabet: no O/0, no I/1. Codes get read aloud and retyped. */
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateCode = (length = 8) =>
  Array.from(
    { length },
    () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  ).join("");

export const normaliseCode = (code: string) =>
  code.trim().toUpperCase().replace(/[\s-]/g, "");

/** Turns an invite code into the link that lands a new user on signup. */
export const inviteLinkFor = (code: string) =>
  `${window.location.origin}/auth/signup?invite=${code}`;

const localCreate = (name: string, actor: WorkspaceActor): Workspace => {
  const workspace: Workspace = {
    id: `ws-${Date.now()}-${generateCode(4).toLowerCase()}`,
    name: name.trim(),
    inviteCode: generateCode(),
    ownerId: actor.id,
    createdAt: new Date().toISOString(),
    members: [
      {
        id: actor.id,
        name: actor.name,
        email: actor.email,
        role: "admin",
        joinedAt: new Date().toISOString(),
      },
    ],
    invites: [],
  };

  upsertRegistry(workspace);
  return workspace;
};

const localJoin = (code: string, actor: WorkspaceActor): Workspace => {
  const wanted = normaliseCode(code);
  const registry = readRegistry();
  const workspace = registry.find(
    (entry) =>
      entry.inviteCode === wanted ||
      entry.invites.some((invite) => invite.code === wanted)
  );

  if (!workspace) {
    throw new WorkspaceError(
      "That invite code was not recognised on this device. Codes from other people need the workspace server, which is not connected yet."
    );
  }

  const already = workspace.members.some((member) => member.id === actor.id);
  if (!already) {
    workspace.members = [
      ...workspace.members,
      {
        id: actor.id,
        name: actor.name,
        email: actor.email,
        role: "member",
        joinedAt: new Date().toISOString(),
      },
    ];
  }

  workspace.invites = workspace.invites.map((invite) =>
    invite.code === wanted && !invite.acceptedAt
      ? { ...invite, acceptedAt: new Date().toISOString() }
      : invite
  );

  upsertRegistry(workspace);
  return workspace;
};

export const workspaceApi = {
  create: async (
    name: string,
    actor: WorkspaceActor,
    token?: string | null
  ): Promise<Workspace> => {
    if (SERVER_BACKED && token) {
      const { data } = await getAuthenticatedClient(token).post(
        workspaceEndpoints.create,
        { name }
      );
      return data.data as Workspace;
    }
    return localCreate(name, actor);
  },

  join: async (
    code: string,
    actor: WorkspaceActor,
    token?: string | null
  ): Promise<Workspace> => {
    if (SERVER_BACKED && token) {
      const { data } = await getAuthenticatedClient(token).post(
        workspaceEndpoints.join,
        { code: normaliseCode(code) }
      );
      return data.data as Workspace;
    }
    return localJoin(code, actor);
  },

  createInvite: async (
    workspace: Workspace,
    email: string | undefined,
    role: WorkspaceRole,
    token?: string | null
  ): Promise<WorkspaceInvite> => {
    if (SERVER_BACKED && token) {
      const { data } = await getAuthenticatedClient(token).post(
        workspaceEndpoints.invites(workspace.id),
        { email, role }
      );
      return data.data as WorkspaceInvite;
    }

    const invite: WorkspaceInvite = {
      code: generateCode(),
      email: email?.trim() || undefined,
      role,
      createdAt: new Date().toISOString(),
    };

    upsertRegistry({
      ...workspace,
      invites: [...workspace.invites, invite],
    });
    return invite;
  },

  revokeInvite: async (
    workspace: Workspace,
    code: string,
    token?: string | null
  ): Promise<void> => {
    if (SERVER_BACKED && token) {
      await getAuthenticatedClient(token).delete(
        workspaceEndpoints.invite(workspace.id, code)
      );
      return;
    }

    upsertRegistry({
      ...workspace,
      invites: workspace.invites.filter((invite) => invite.code !== code),
    });
  },

  removeMember: async (
    workspace: Workspace,
    memberId: string,
    token?: string | null
  ): Promise<void> => {
    if (SERVER_BACKED && token) {
      await getAuthenticatedClient(token).delete(
        workspaceEndpoints.member(workspace.id, memberId)
      );
      return;
    }

    upsertRegistry({
      ...workspace,
      members: workspace.members.filter((member) => member.id !== memberId),
    });
  },

  /** Kept so the store can refresh from whichever source is authoritative. */
  sync: async (workspace: Workspace): Promise<Workspace> => {
    if (SERVER_BACKED) return workspace;
    const registry = readRegistry();
    return registry.find((entry) => entry.id === workspace.id) ?? workspace;
  },
};
