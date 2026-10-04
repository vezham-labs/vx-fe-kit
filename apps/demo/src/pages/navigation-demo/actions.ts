import type { NavigationAction, NavigationToolbar } from '@vx/react'
import type { SectionAction } from '@vx/react/layouts/section'
import type { ToolbarActionEvent } from '@vx/react/toolbar-actions'

export const getToolbarActions = (
  toolbar: NavigationToolbar,
  context: Omit<ToolbarActionEvent, 'actionKey'>,
  emit: (event: ToolbarActionEvent) => boolean
) => {
  const bindAction = (action: NavigationAction): SectionAction => ({
    ...action,
    children: action.children?.map(bindAction),
    onAction: () => {
      emit({ ...context, actionKey: action.key })
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
