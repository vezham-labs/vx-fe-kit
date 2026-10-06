# Navigation menus

Below 640px, the application menu uses a HeroUI Pro bottom Sheet. On larger
screens it retains its Dropdown and nested popovers. This presentation is owned
by the React package; apps keep their `vx.nav.yaml` menu configuration and action
handlers.

The small-screen application sheet keeps Search, Bookmarks, and Storage together
before the separator. Menu groups open as local detail panels with a Back action;
selecting an action closes the sheet and calls the existing app-menu handler.
Sidebar visibility and command-palette actions retain their existing behavior.

The bottom navigation More control opens a Sheet containing the overflow
navigation destinations as full-width stacked rows. Its visible title is hidden
with `MenuSheet`’s optional `hideTitle` prop; `title` still supplies the accessible
dialog name. The Application menu also opts into `hideTitle`. Other callers
keep their title visible by default. Labels wrap within each
row, and only the sheet body scrolls when the destinations exceed the available
height. Selecting a destination closes the sheet and follows
its existing navigation handler. Resizing retains the previous close behavior.

Both menus use the shared internal `MenuSheet` component, with a drag handle,
close button, bounded scrolling, safe-area padding, and focus restoration. Only
the handle can drag the sheet, so menu interactions remain usable. The overlay
renders above the bottom navigation. The account/footer More menu remains a
Dropdown; its Control Center entry opens the separate Control Center sheet.
