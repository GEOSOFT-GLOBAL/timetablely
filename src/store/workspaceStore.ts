import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  LOCAL_ACTOR_ID,
  WorkspaceError,
  workspaceApi,
  type Workspace,
  type WorkspaceActor,
  type WorkspaceInvite,
  type WorkspaceRole,
} from "@/lib/workspace-api";
import { useAuthStore } from "./authStore";

/**
 * Company-mode workspaces: the shared container a team's records belong to.
 *
 * Education and individual workspaces are single-user, so nothing here runs
 * for them — the store stays empty and the UI that reads it is only mounted
 * in company mode.
 */

interface WorkspaceState {
  /** Every workspace this user belongs to. */
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  isLoading: boolean;
  error: string | null;

  createWorkspace: (name: string) => Promise<Workspace | null>;
  joinWorkspace: (code: string) => Promise<Workspace | null>;
  setActiveWorkspace: (workspaceId: string) => void;
  leaveWorkspace: (workspaceId: string) => void;
  inviteMember: (
    email: string,
    role: WorkspaceRole
  ) => Promise<WorkspaceInvite | null>;
  revokeInvite: (code: string) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  clearError: () => void;
}

/** Who is acting, taken from the signed-in user. */
export const currentActor = (): WorkspaceActor => {
  const user = useAuthStore.getState().user;
  return {
    id: user?.id ?? LOCAL_ACTOR_ID,
    name:
      user?.firstname && user?.lastname
        ? `${user.firstname} ${user.lastname}`
        : (user?.username ?? "You"),
    email: user?.email ?? "",
  };
};

const messageFor = (error: unknown, fallback: string) =>
  error instanceof WorkspaceError
    ? error.message
    : error instanceof Error && error.message
      ? error.message
      : fallback;

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => {
      /** The workspace every mutating call below acts on. */
      const active = () =>
        get().workspaces.find(
          (workspace) => workspace.id === get().activeWorkspaceId
        ) ?? null;

      const replace = (updated: Workspace) =>
        set((state) => ({
          workspaces: state.workspaces.map((workspace) =>
            workspace.id === updated.id ? updated : workspace
          ),
        }));

      return {
        workspaces: [],
        activeWorkspaceId: null,
        isLoading: false,
        error: null,

        createWorkspace: async (name) => {
          if (!name.trim()) {
            set({ error: "Give the workspace a name." });
            return null;
          }

          set({ isLoading: true, error: null });
          try {
            const token = useAuthStore.getState().token;
            const workspace = await workspaceApi.create(
              name,
              currentActor(),
              token
            );

            set((state) => ({
              workspaces: [...state.workspaces, workspace],
              activeWorkspaceId: workspace.id,
              isLoading: false,
            }));
            return workspace;
          } catch (error) {
            set({
              isLoading: false,
              error: messageFor(error, "Could not create the workspace."),
            });
            return null;
          }
        },

        joinWorkspace: async (code) => {
          if (!code.trim()) {
            set({ error: "Enter the invite code you were sent." });
            return null;
          }

          set({ isLoading: true, error: null });
          try {
            const token = useAuthStore.getState().token;
            const workspace = await workspaceApi.join(
              code,
              currentActor(),
              token
            );

            set((state) => ({
              // Joining a workspace already in the list is a refresh, not a
              // duplicate row.
              workspaces: state.workspaces.some(
                (entry) => entry.id === workspace.id
              )
                ? state.workspaces.map((entry) =>
                    entry.id === workspace.id ? workspace : entry
                  )
                : [...state.workspaces, workspace],
              activeWorkspaceId: workspace.id,
              isLoading: false,
            }));
            return workspace;
          } catch (error) {
            set({
              isLoading: false,
              error: messageFor(error, "Could not join that workspace."),
            });
            return null;
          }
        },

        setActiveWorkspace: (workspaceId) =>
          set({ activeWorkspaceId: workspaceId }),

        leaveWorkspace: (workspaceId) =>
          set((state) => {
            const remaining = state.workspaces.filter(
              (workspace) => workspace.id !== workspaceId
            );
            return {
              workspaces: remaining,
              activeWorkspaceId:
                state.activeWorkspaceId === workspaceId
                  ? (remaining[0]?.id ?? null)
                  : state.activeWorkspaceId,
            };
          }),

        inviteMember: async (email, role) => {
          const workspace = active();
          if (!workspace) return null;

          set({ isLoading: true, error: null });
          try {
            const token = useAuthStore.getState().token;
            const invite = await workspaceApi.createInvite(
              workspace,
              email,
              role,
              token
            );

            replace({
              ...workspace,
              invites: [...workspace.invites, invite],
            });
            set({ isLoading: false });
            return invite;
          } catch (error) {
            set({
              isLoading: false,
              error: messageFor(error, "Could not create the invite."),
            });
            return null;
          }
        },

        revokeInvite: async (code) => {
          const workspace = active();
          if (!workspace) return;

          const token = useAuthStore.getState().token;
          await workspaceApi.revokeInvite(workspace, code, token);
          replace({
            ...workspace,
            invites: workspace.invites.filter((invite) => invite.code !== code),
          });
        },

        removeMember: async (memberId) => {
          const workspace = active();
          if (!workspace) return;

          const token = useAuthStore.getState().token;
          await workspaceApi.removeMember(workspace, memberId, token);
          replace({
            ...workspace,
            members: workspace.members.filter(
              (member) => member.id !== memberId
            ),
          });
        },

        clearError: () => set({ error: null }),
      };
    },
    { name: "timetablely-workspaces" }
  )
);

/** The workspace the app is currently acting inside, if any. */
export const useActiveWorkspace = () =>
  useWorkspaceStore((state) =>
    state.workspaces.find(
      (workspace) => workspace.id === state.activeWorkspaceId
    )
  );
