import { useLocation } from '@tanstack/react-router'
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useCallback
} from 'react'

import { Surface, cn, toast } from '@vezham/react-v3'

import { type AppMenuItem, AppMenuProvider } from '../../components/app-menu'
import { CommandProvider } from '../../components/command'
import { InfoPanelProvider } from '../../components/panel/info-panel'
import {
  ToolbarActionsProvider,
  useToolbarActions
} from '../../components/toolbar-actions'
import { WorkspaceNavigationProvider } from '../../components/workspace-navigation'
import { getNavigationPageKey } from '../../navigation'
import type { AppNavigationItem } from '../../navigation'
import { type User, UserProvider } from '../../store/users/useUserStore'
import { MenuLayout } from '../menu-layout'

type AppFrameProps = {
  children: ReactNode
  contentClassName?: string
  navigation?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const AppFrame = ({
  children,
  className,
  contentClassName,
  navigation,
  ...props
}: AppFrameProps) => {
  return (
    <Surface
      variant="transparent"
      data-vx="app-layout"
      className={cn(
        'bg-background flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden md:flex-row',
        className
      )}
      {...props}>
      {navigation}
      <main
        data-slot="app-layout-content"
        className={cn(
          'min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto transition-[width,transform] duration-300 ease-out',
          contentClassName
        )}>
        {children}
      </main>
    </Surface>
  )
}

export type AppLayoutProps = Omit<AppFrameProps, 'navigation'> & {
  navigationItems: AppNavigationItem[]
  appMenu?: AppMenuItem[]
  user?: User | null
}

const AppLayout = ({
  children,
  navigationItems,
  appMenu = [],
  user,
  ...frameProps
}: AppLayoutProps) => {
  return (
    <ToolbarActionsProvider>
      <AppMenuShell items={appMenu} navigationItems={navigationItems}>
        <UserProvider initialUser={user}>
          <CommandProvider items={navigationItems}>
            <InfoPanelProvider>
              <WorkspaceNavigationProvider>
                <AppFrame
                  {...frameProps}
                  navigation={<MenuLayout items={navigationItems} />}>
                  {children}
                </AppFrame>
              </WorkspaceNavigationProvider>
            </InfoPanelProvider>
          </CommandProvider>
        </UserProvider>
      </AppMenuShell>
    </ToolbarActionsProvider>
  )
}

const AppMenuShell = ({
  items,
  navigationItems,
  children
}: {
  items: AppMenuItem[]
  navigationItems: AppNavigationItem[]
  children: ReactNode
}) => {
  const { pathname } = useLocation()
  const { emit } = useToolbarActions()
  const pageKey = getNavigationPageKey(navigationItems, pathname)
  const onAction = useCallback(
    (action: AppMenuItem['groups'][number][number]) => {
      if (!emit({ actionKey: action.key, pageKey, pathname })) {
        toast.info(
          `TODO: ${action.label.replace(/…$/, '')} is not implemented yet.`
        )
      }
    },
    [emit, pageKey, pathname]
  )
  return (
    <AppMenuProvider items={items} onAction={onAction}>
      {children}
    </AppMenuProvider>
  )
}

export { AppFrame, AppLayout }
export type { AppFrameProps }
