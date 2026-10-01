import type { NavigationAction, NavigationToolbar } from '@vx/react'
import type { SectionAction } from '@vx/react/layouts/section'

export const getToolbarActions = (
  toolbar: NavigationToolbar,
  pageKey: string
) => {
  const bindAction = (action: NavigationAction): SectionAction => ({
    ...action,
    children: action.children?.map(bindAction),
    onAction: () => {
      if (action.key === 'print') window.print()
      else
        window.dispatchEvent(
          new CustomEvent('demo:toolbar-action', {
            detail: { action: action.key, pageKey }
          })
        )
    }
  })
  return {
    sync: toolbar.sync ?? false,
    menuActions: toolbar.menuActions?.map(bindAction) ?? [],
    primaryAction: toolbar.primaryAction
      ? bindAction(toolbar.primaryAction)
      : undefined
  }
}
