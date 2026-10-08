# Bookmarks, Favorites, and Quick Access

Bookmarks, Favorites, and Quick Access pins are three independent app-supplied
collections. Bookmarks supports folders; Favorites and pins do not depend on a
matching bookmark. Their IDs and item metadata are resolved separately.

- Favorites shows a compact grid with at most 12 items. Adding items is owned by the app. The tile context menu provides Remove Favorite.
- Quick Access shows the first six pins as horizontal cards. Pins have no limit.
  View All opens All Pins inside the Bookmarks panel; Back returns to the normal
  sections.
- All Pins shows every pinned item with its name and optional URL. Its unpin
  action removes the pin without deleting the bookmark or its favorite status.

Favorites and Quick Access cards use ContextMenu for Remove Favorite and Unpin,
respectively; they do not show inline removal buttons. All Pins can expose a
visible unpin action. Bookmark and folder operations remain in their context menus; their rows also
provide a delete icon on hover or keyboard focus. Drag-and-drop reordering remains available.

The app owns adding Favorites and pins. The panel provides no pin, star, or add
controls. Pass app collections through `favorites` and `pins`; use
`onFavoritesChange` and `onPinsChange` to handle removal in app state. The panel
calls these callbacks with the remaining items, and app updates are authoritative.

The bookmark store response contains `bookmarks`, `favorites`, and `pins`.
The three arrays are independent. Demo fixtures use a dedicated `samplePins`
array rather than deriving pins from Favorites or Bookmarks.

When no change callback is supplied, shared React state stores removal IDs and
favorite order in local storage under `vx:bookmark-membership`. This leaves room
for newly supplied app items rather than freezing the original membership list.
Unpinning or removing a favorite only changes that collection. Bookmark edits
and deletion do not affect pins or Favorites. Each shortcut uses metadata from
its own app-supplied collection. Invalid preferences fall back to app data.
