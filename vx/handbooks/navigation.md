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

Keep navigation-review demos focused on the navigation and toolbar. Their page
outlets display only the current URL; domain page content is added separately.
