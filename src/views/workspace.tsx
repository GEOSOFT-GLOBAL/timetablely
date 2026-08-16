import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  BuildingIcon,
  CopyIcon,
  LinkIcon,
  MailIcon,
  TicketIcon,
  Trash2Icon,
  UserMinusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppMode } from "@/hooks/use-app-mode";
import { inviteLinkFor, type WorkspaceRole } from "@/lib/workspace-api";
import { useAuthStore } from "@/store/authStore";
import { useActiveWorkspace, useWorkspaceStore } from "@/store/workspaceStore";

const copyToClipboard = async (value: string) => {
  await navigator.clipboard.writeText(value);
};

/**
 * The shared container behind company mode: who is in it, who has been asked,
 * and the code that lets someone else in. Only reachable in company mode —
 * the other two workspaces are single-user by design.
 */
const WorkspaceView = () => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const user = useAuthStore((state) => state.user);
  const workspace = useActiveWorkspace();
  const {
    workspaces,
    isLoading,
    error,
    clearError,
    createWorkspace,
    joinWorkspace,
    setActiveWorkspace,
    inviteMember,
    revokeInvite,
    removeMember,
  } = useWorkspaceStore();

  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<WorkspaceRole>("member");
  const [newName, setNewName] = React.useState("");
  const [joinCode, setJoinCode] = React.useState("");

  const handleInvite = async () => {
    const invite = await inviteMember(inviteEmail, inviteRole);
    if (!invite) return;

    setInviteEmail("");
    toast.success(
      inviteEmail.trim()
        ? t("workspace.inviteSent", { email: inviteEmail.trim() })
        : t("workspace.createInvite")
    );
  };

  const handleCopy = async (value: string, message: string) => {
    try {
      await copyToClipboard(value);
      toast.success(message);
    } catch {
      toast.error(t("workspace.copyFailed"));
    }
  };

  // No workspace yet — either a company user from before workspaces existed,
  // or someone who skipped setup.
  if (!workspace) {
    return (
      <div className="flex w-full flex-col gap-6 px-4 py-4 md:py-6 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold">{t("workspace.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("workspace.none")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BuildingIcon className="size-5" />
                {t("workspace.create")}
              </CardTitle>
              <CardDescription>{t("workspace.createDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Label htmlFor="new-workspace">{t("workspace.name")}</Label>
              <Input
                id="new-workspace"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Northwind Studio"
              />
              <Button
                className="w-fit"
                disabled={isLoading || !newName.trim()}
                onClick={async () => {
                  const created = await createWorkspace(newName);
                  if (created) {
                    setNewName("");
                    toast.success(t("workspace.created", { name: created.name }));
                  }
                }}
              >
                {t("workspace.create")}
              </Button>
            </CardContent>
          </Card>

          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TicketIcon className="size-5" />
                {t("workspace.join")}
              </CardTitle>
              <CardDescription>{t("workspace.joinDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Label htmlFor="join-code">{t("workspace.code")}</Label>
              <Input
                id="join-code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="ABCD2345"
                className="font-mono tracking-[0.2em]"
              />
              <Button
                className="w-fit"
                disabled={isLoading || !joinCode.trim()}
                onClick={async () => {
                  const joined = await joinWorkspace(joinCode);
                  if (joined) {
                    setJoinCode("");
                    toast.success(t("workspace.joined", { name: joined.name }));
                  }
                }}
              >
                {t("workspace.join")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {error ? (
          <div className="border-destructive text-destructive bg-destructive/10 flex items-start justify-between gap-4 border p-4 text-sm">
            <span>{error}</span>
            <button type="button" onClick={clearError} className="underline">
              {t("common.cancel")}
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  const isAdmin = workspace.members.some(
    (member) => member.id === user?.id && member.role === "admin"
  );
  const pending = workspace.invites.filter((invite) => !invite.acceptedAt);

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-4 md:py-6 lg:px-6">
      {/* Identity and the code that lets people in */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{workspace.name}</h1>
          <p className="text-muted-foreground mt-1">
            {t("workspace.memberCount", {
              count: workspace.members.length,
              members: labels.tutors.toLowerCase(),
            })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-3 border px-4 py-2">
            <span className="text-muted-foreground michroma text-[10px] uppercase tracking-[0.18em]">
              {t("workspace.code")}
            </span>
            <span className="font-mono text-sm tracking-[0.2em]">
              {workspace.inviteCode}
            </span>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              handleCopy(workspace.inviteCode, t("workspace.codeCopied"))
            }
          >
            <CopyIcon className="size-4" />
            {t("workspace.copyCode")}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              handleCopy(
                inviteLinkFor(workspace.inviteCode),
                t("workspace.linkCopied")
              )
            }
          >
            <LinkIcon className="size-4" />
            {t("workspace.copyLink")}
          </Button>
        </div>
      </div>

      {workspaces.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground michroma text-[10px] uppercase tracking-[0.18em]">
            {t("workspace.switch")}
          </span>
          {workspaces.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActiveWorkspace(entry.id)}
              className={
                entry.id === workspace.id
                  ? "bg-primary text-primary-foreground border-primary border px-3 py-1.5 text-xs"
                  : "text-muted-foreground hover:text-foreground hover:border-primary/40 border px-3 py-1.5 text-xs"
              }
            >
              {entry.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Invite */}
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailIcon className="size-5" />
              {t("workspace.inviteMembers")}
            </CardTitle>
            <CardDescription>{t("workspace.inviteDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder={t("workspace.emailPlaceholder")}
                type="email"
                aria-label={t("workspace.emailPlaceholder")}
              />
              <Select
                value={inviteRole}
                onValueChange={(value) => setInviteRole(value as WorkspaceRole)}
              >
                <SelectTrigger className="sm:w-36">
                  <SelectValue placeholder={t("workspace.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    {t("workspace.roles.admin")}
                  </SelectItem>
                  <SelectItem value="member">
                    {t("workspace.roles.member")}
                  </SelectItem>
                  <SelectItem value="viewer">
                    {t("workspace.roles.viewer")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-fit"
              disabled={isLoading || !isAdmin}
              onClick={handleInvite}
            >
              {t("workspace.createInvite")}
            </Button>

            {!isAdmin && (
              <p className="text-muted-foreground text-xs">
                {t("workspace.adminOnly")}
              </p>
            )}

            <div className="flex flex-col gap-2 border-t pt-3">
              <p className="text-muted-foreground michroma text-[10px] uppercase tracking-[0.18em]">
                {t("workspace.pendingInvitations")}
              </p>

              {pending.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  {t("workspace.noInvites")}
                </p>
              ) : (
                pending.map((invite) => (
                  <div
                    key={invite.code}
                    className="flex items-center justify-between gap-3 border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm">
                        {invite.email || t("workspace.openInvite")}
                      </p>
                      <p className="text-muted-foreground font-mono text-xs tracking-[0.2em]">
                        {invite.code} · {t(`workspace.roles.${invite.role}`)}
                      </p>
                    </div>
                    <div className="flex shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t("workspace.copyLink")}
                        onClick={() =>
                          handleCopy(
                            inviteLinkFor(invite.code),
                            t("workspace.linkCopied")
                          )
                        }
                      >
                        <LinkIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t("common.remove")}
                        className="hover:text-destructive"
                        onClick={async () => {
                          await revokeInvite(invite.code);
                          toast.success(t("workspace.inviteRevoked"));
                        }}
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Members */}
        <Card className="gap-4">
          <CardHeader>
            <CardTitle>{t("workspace.members")}</CardTitle>
            <CardDescription>{t("workspace.membersDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {workspace.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-3 border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {member.name}
                    {member.id === user?.id && (
                      <span className="text-muted-foreground ml-2 text-xs">
                        {t("workspace.you")}
                      </span>
                    )}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {member.email || "—"} · {t(`workspace.roles.${member.role}`)}
                  </p>
                </div>

                {isAdmin && member.id !== user?.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("workspace.removeFromWorkspace")}
                    className="hover:text-destructive shrink-0"
                    onClick={() => removeMember(member.id)}
                  >
                    <UserMinusIcon className="size-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {error ? (
        <div className="border-destructive text-destructive bg-destructive/10 flex items-start justify-between gap-4 border p-4 text-sm">
          <span>{error}</span>
          <button type="button" onClick={clearError} className="underline">
            {t("common.cancel")}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default WorkspaceView;
