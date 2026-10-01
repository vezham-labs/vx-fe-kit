# Navigation

Each app using the shared shell owns `vx.nav.yaml` at its root. It defines
ordered menu items and nested sidebar or route-tab destinations. Routes and
React callbacks remain in application code.

```yaml
# yaml-language-server: $schema=../../vx/schemas/vx.nav.json
items:
  - key: home
    title: Home
    href: /
    icon: vx:home
    iconActive: vx:home-filled
```

Items require `key` and `title`. Optional fields are `href`, `icon`,
`iconActive`, and recursive `children`. Keys must be unique among siblings.
Array order determines presentation order. A group may omit `href`.

`metadata:generate` writes `src/generated/navigation.ts` when the YAML file
exists. Import `navigationItems` from `@generated/navigation` and pass it to
`AppLayout`; section layouts select the appropriate item's children from the
same tree. `metadata:watch` watches app and navigation YAML changes.

Use `getNavigationChildren('academic')` from `@generated/navigation` to select
a top-level item's children. It returns an empty array for a leaf and throws
an explicit error for an unknown key. Keys are scoped to the top-level items
for this helper, since nested keys may repeat across different sections.

Edit the YAML source instead of generated TypeScript. Custom actions, dynamic
badges, permission filtering, and stateful tabs belong in handwritten code
that consumes the generated data. This generator targets the web shell;
other repositories may adapt the shared keys and hierarchy for native screens.

Use `SectionLayout` from `@vx/react/layouts/section` for route sections with
header tabs and an optional sidebar. It uses the shell's shared collapse state,
a 224px desktop sidebar, and a drawer on small screens. Pass section destinations
through `sidebarItems`, the active section's children through `tabs`, and custom
header controls through `toolbar`. Render an `Outlet` as its children so each
app owns the content pages and their toolbars independently of the navigation
layout. Keep the layout on a parent route so child navigation preserves it.

When a section has no tabs, leave the toolbar title area empty. The section
title remains available for accessible tab labels and the mobile sidebar dialog.

Section headers follow the School OS toolbar: sidebar/history controls and tabs
on the left; Search, Refresh, More, and the primary action on the right. Pass
controlled `search`, `menuActions` (with optional submenu children), and
`primaryAction` to `SectionLayout`. Apps own the action labels and callbacks.
On small screens, tabs move below the controls, Search opens a popover, and the
primary action keeps its icon while hiding its label. Demo actions emit
`demo:toolbar-action` events; domain content stays in the app's route outlet.

Short mobile tab groups use a centered content-width pill; long groups scroll
within the available header width. Keep row spacing outside the pill. A new
tab collection remounts the Tabs root so its indicator measures the new labels;
navigation within that collection preserves the root and its transition.

Keep navigation-review demos focused on the navigation and toolbar. Their page
outlets display only the current URL; domain page content is added separately.

## Sidebar controls

Use macOS menu terminology: **Show Sidebar** and **Hide Sidebar**. Sidebar
controls show a shortcut tooltip and use ⌘S. Section toolbars also support ⌘←
for Back, ⌘→ for Forward, and ⌘R for Refresh. Register sidebar actions with
`useSidebarShortcut` so the active layout handles the shortcut once, including
the mobile drawer and the independent Home sidebar.

For shortcuts that accept either platform modifier, pass `Mod` to `ShortcutKey`
or `ShortcutTooltipLabel` (for example, `Mod K`). It displays ⌘ on macOS and
Ctrl on Windows/Linux. Keep explicit modifiers for bindings that require them.
