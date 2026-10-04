# Control Center

A Control Center is a compact overlay for frequent preferences. It uses an
ordered tile registry and a local panel outlet for detail screens. Opening a
detail screen does not add a browser-history entry; Back returns to home.

## Tile registry

Keep every home tile in one ordered registry. Its order is both visual and
keyboard order. A tile either performs its action directly or opens a detail
panel. Model those as separate type branches rather than branching on IDs
elsewhere.

```tsx
const tiles = [
  { id: 'theme', span: 'compact', Tile: ThemeToggle },
  {
    id: 'language',
    span: 'standard',
    Tile: LanguageTile,
    title: 'Language',
    Panel: LanguageSettings
  },
  {
    id: 'reading',
    span: 'full',
    Tile: ReadingTile,
    title: 'Reading preferences',
    Panel: ReadingSettings
  }
]
```

Detail tiles receive an `onOpen` callback from the home. The detail panel mounts
only after that callback runs, so it cannot open itself. Derive the active panel
ID from entries that include `Panel`. Store component references, not JSX or
captured route values; pass current context at render time.

## Layout

Use an authored four-unit grid. A registry entry declares its span, and the grid
preserves registry order. Do not use dense packing: it may move later compact
controls into earlier empty cells.

| Span       | Grid units | Use for                                |
| ---------- | ---------- | -------------------------------------- |
| `compact`  | 1          | Icon-only toggle                       |
| `standard` | 2          | Icon, short label, and optional status |
| `wide`     | 3          | Longer labels or grouped controls      |
| `full`     | 4          | Sliders and full-row settings          |

Compact tiles fill a square cell. Set a panel width that keeps a standard tile's
icon, padding, label, and status readable. Use separate horizontal and vertical
gutters when rows need more breathing room.

The grid governs placement. A tile component governs its content, including
truncation, icon size, and direct action.

## Panel outlet

The overlay owner keeps `isOpen` and `activePanel` state. Render home when
`activePanel` is `null`; otherwise the outlet resolves the matching entry and
renders a shared Back header plus that entry's `Panel`.

Use a modal at narrow viewports and an anchored popover at larger widths. Close
the overlay and reset `activePanel` together so reopening starts at home.

## Styling

Use a shared variant definition for the surface, tile spans, tile content, and
selectable option rows. Keep styling decisions in those slots and pass semantic
variants such as `span` or `selected`; avoid component-specific layout logic in
the home renderer.

For a liquid-glass surface, use a translucent background, border, subtle edge
highlight, and backdrop blur. Keep contrast sufficient for labels and focus
indicators in both themes. Icons should use an explicit `size`; classes should
only provide color, spacing, and state styling.

## Verification

Check the following after changing the registry or layout:

- Visual order matches registry order.
- Compact controls fill one square cell; standard, wide, and full controls span
  the correct number of units.
- A direct-action tile works without opening a detail panel.
- A detail tile opens its panel, Back returns home, and closing then reopening
  starts at home.
- The popover is anchored to its trigger on larger screens; the modal is usable
  on small screens.
- Keyboard focus and accessible names work for every control.
