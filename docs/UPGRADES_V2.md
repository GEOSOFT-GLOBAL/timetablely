# Timetablely — V2 Upgrade Plan (Company Mode)

A phased roadmap for evolving the app into a full company-grade workspace when `mode === "company"`.
All steps are additive and non-breaking to the existing education / individual modes.

---

## Step 1 — Rename Core Files to Mode-Agnostic Names

The current file names are education-centric. Rename them so they describe the data shape, not the domain term.

| Current file | New file | Reason |
|---|---|---|
| `src/views/tutors.tsx` | `src/views/members-view.tsx` | Renders tutors / people / members |
| `src/views/courses.tsx` | `src/views/items-view.tsx` | Renders courses / activities / tasks |
| `src/views/sessions.tsx` | `src/views/groups-view.tsx` | Renders classes / groups / projects |
| `src/views/timetables.tsx` | `src/views/schedule-view.tsx` | Renders the timetable grid |
| `src/components/tutor-item.tsx` | `src/components/member-item.tsx` | Row/card for a single member entity |
| `src/components/course-item.tsx` | `src/components/item-card.tsx` | Row/card for a single task/course entity |
| `src/components/session-item.tsx` | `src/components/group-item.tsx` | Row/card for a single group/project entity |

Route paths and lazy-imports in `app.routes.tsx` update accordingly.
The `labels` object from `useAppMode()` already provides the correct display names — no visible string changes needed.

---

## Step 2 — Company Mode: Task Card UI (monday.com style)

When `isCompany === true`, replace the plain list layout in `items-view.tsx` (currently `courses.tsx`) with a **card board**.

### Layout change
- Switch the right-side `<Card>` list to a responsive grid of task cards (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`).
- Each task card shows: **title**, **assigned member**, **priority badge** (color-coded Low/Medium/High), **periods-per-week as an effort estimate**, and an **avatar** for the assignee.
- Card uses Shadcn `<Card>` + `<Badge>` components already in the project.

### Add-task via Drawer
- Replace the left-side inline form with a **"New Task" button** that opens a `<Sheet side="right">` (already exists in `src/components/ui/sheet.tsx`).
- The Sheet contains the same fields (name, assign member, effort, priority, avoid-consecutive) but laid out vertically with better spacing.
- On mobile the Sheet slides from the bottom (`side="bottom"`).

### Task card skeleton
```tsx
// item-card.tsx (company mode variant)
<Card className="flex flex-col gap-3 p-4 hover:shadow-md transition-shadow cursor-pointer">
  <div className="flex items-start justify-between">
    <span className="font-medium text-sm">{task.name}</span>
    <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
  </div>
  <div className="flex items-center gap-2 text-xs text-muted-foreground">
    <Avatar className="size-5"><AvatarFallback>{initials(member)}</AvatarFallback></Avatar>
    <span>{member?.name ?? "Unassigned"}</span>
  </div>
  <div className="text-xs text-muted-foreground">
    Effort: {task.periodsPerWeek} period{task.periodsPerWeek !== 1 ? "s" : ""}/week
  </div>
</Card>
```

---

## Step 3 — Company Mode: Linear-style Navigation

When `isCompany === true`, the sidebar gets additional sections rendered conditionally by `AppSidebar`.

### New sidebar sections (company only)
```
▸ Workspace          (replaces "Overview" label)
  — Dashboard
▸ Core
  — Schedule         (timetable grid)
  — Tasks            (item-card board)
  — Members          (member list)
  — Projects         (groups/kanban)
▸ Management
  — Templates
  — Analytics
▸ Settings & Help
  — How to Use
  — Settings
```

### Visual style cues from Linear
- Active nav item: left border accent + subtle background tint (already implemented with `border-l-2 border-primary`).
- Section labels: small-caps, muted, 11 px (already implemented).
- Add a **workspace name** below the logo in the `SidebarHeader` (reads from a future `workspaceStore`).
- Add a **member avatar cluster** at the top of the sidebar showing online members (Step 5).

Implementation: extend `getNavCore` / `navManagement` in `app-sidebar.tsx` with an `isCompany` guard passed as a parameter.

---

## Step 4 — Member Invitation System

### Data model additions (`src/interface/`)
```ts
// invitation.ts
export interface IInvitation {
  id: string;
  email: string;
  role: "admin" | "member" | "viewer";
  status: "pending" | "accepted" | "declined";
  invitedAt: string;        // ISO date
  expiresAt: string;        // ISO date, 7 days default
  token: string;            // UUID, used in invite link
}

// workspace.ts
export interface IWorkspace {
  id: string;
  name: string;
  ownerId: string;
  members: IWorkspaceMember[];
  invitations: IInvitation[];
  createdAt: string;
}

export interface IWorkspaceMember {
  userId: string;
  role: "admin" | "member" | "viewer";
  joinedAt: string;
}
```

### Invitation flow (UI)
1. **Invite button** in the sidebar footer (company mode only) opens a Sheet.
2. Sheet contains: email input, role selector (`<Select>`), send button.
3. Pending invitations listed below with status badges and a revoke action.
4. Accepted members appear in the Members view (`members-view.tsx`).

### Invite link
- Format: `https://app.timetablely.com/invite/{token}`
- Token validated server-side (Step 6); client shows an accept/decline screen.
- Copy-to-clipboard button alongside each pending invite row.

### Zustand store additions
```ts
// workspaceStore.ts
interface WorkspaceState {
  workspace: IWorkspace | null;
  setWorkspace: (w: IWorkspace) => void;
  addInvitation: (inv: IInvitation) => void;
  revokeInvitation: (id: string) => void;
  acceptInvitation: (token: string) => void;
}
```

---

## Step 5 — Workspace Member Presence (sidebar avatar cluster)

Show which members are currently active in the workspace — similar to Linear's top-right presence indicators.

- `SidebarHeader` renders up to 5 `<Avatar>` components (stacked with `-ml-2`).
- A `+N` overflow badge for workspaces with more than 5 members.
- Presence data fetched via polling or WebSocket from the service layer.
- Tooltip on hover shows name + "Active now" / "Last seen X min ago".

This is purely a display feature — no new routes needed.

---

## Step 6 — Service / Backend Integration

The invitation system requires server-side support (token validation, email delivery, role enforcement).

### Endpoints needed (in `geosoft-service`)
| Method | Path | Description |
|---|---|---|
| `POST` | `/workspaces/:id/invitations` | Create invitation, send email |
| `GET` | `/invitations/:token` | Validate token, return invite details |
| `POST` | `/invitations/:token/accept` | Accept invite, create workspace member |
| `DELETE` | `/workspaces/:id/invitations/:invId` | Revoke invitation |
| `GET` | `/workspaces/:id/members` | List all members |
| `DELETE` | `/workspaces/:id/members/:userId` | Remove member |

### Email delivery
- Use a transactional email provider (Resend / SendGrid).
- Template: invite link + workspace name + inviter name + expiry date.

### Role-based access control
- `admin` — full CRUD on all resources + invite/remove members.
- `member` — read/write own resources, cannot invite.
- `viewer` — read-only across all views.
- Enforce on every API route; reflect in UI by disabling add/edit/delete controls for `viewer`.

---

## Step 7 — i18n Keys for New Features

Add the following keys to `src/i18n/locales/en.ts` and `es.ts` when the above steps are built:

```ts
// en.ts additions
workspace: {
  title: "Workspace",
  inviteMembers: "Invite Members",
  pendingInvitations: "Pending Invitations",
  emailPlaceholder: "colleague@example.com",
  selectRole: "Select role",
  roles: { admin: "Admin", member: "Member", viewer: "Viewer" },
  inviteSent: "Invitation sent to {{email}}",
  inviteRevoked: "Invitation revoked",
  copyLink: "Copy invite link",
  linkCopied: "Link copied!",
  memberSince: "Member since {{date}}",
  removeFromWorkspace: "Remove from workspace",
},
tasks: {
  newTask: "New Task",
  effort: "Effort (periods/week)",
  unassigned: "Unassigned",
},
```

---

## Implementation Order

```
Step 1  →  File rename (no behaviour change, safe at any time)
Step 2  →  Task card UI + drawer (frontend only, company mode guard)
Step 3  →  Linear-style nav additions (frontend only)
Step 4  →  Invitation UI + Zustand store (frontend, no real email yet)
Step 5  →  Member presence display (frontend, mock data first)
Step 6  →  Backend endpoints + email delivery
Step 7  →  i18n strings (add alongside each step above)
```

Each step is independently deployable behind the `isCompany` guard so education and individual modes are never affected.
