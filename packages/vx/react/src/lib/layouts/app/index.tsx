import {
  Outlet,
  useLocation,
  useMatches,
  useNavigate
} from '@tanstack/react-router'
import {
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  useCallback
} from 'react'

import { Surface, cn, toast } from '@vezham/react-v3'

import { type AppMenuItem, AppMenuProvider } from '../../components/app-menu'
import { CommandProvider } from '../../components/command'
import { ConfiguredControlCenter } from '../../components/panel/footer/control-center/configured'
import type {
  ControlCenterConfig,
  ControlCenterI18n
} from '../../components/panel/footer/control-center/types'
import { InfoPanelProvider } from '../../components/panel/info-panel'
import {
  ToolbarActionsProvider,
  useToolbarActions
} from '../../components/toolbar-actions'
import { WorkspaceNavigationProvider } from '../../components/workspace-navigation'
import type { AppNavigationItem } from '../../navigation'
import { getNavigationPageKey } from '../../navigation'
import {
  SettingsNavigationContext,
  type SettingsSection
} from '../../pages/settings/navigation'
import { type User, UserProvider } from '../../store/users/useUserStore'
import { MenuLayout } from '../menu-layout'
import { SettingsLayout } from '../settings'

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
          'min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-18 pb-32 transition-[width,transform] duration-300 ease-out md:p-0',
          contentClassName
        )}>
        {children}
      </main>
    </Surface>
  )
}

export type AppLayoutProps = Omit<AppFrameProps, 'navigation' | 'children'> & {
  children?: ReactNode
  navigationItems: AppNavigationItem[]
  appMenu?: AppMenuItem[]
  user?: User | null
  settings?: boolean
  controlCenter?: ControlCenterConfig
  controlCenterSlot?: ReactElement
  i18n?: ControlCenterI18n
}

type AppLayoutViewProps = Omit<AppFrameProps, 'navigation'> & {
  navigationItems: AppNavigationItem[]
  controlCenterSlot?: ReactElement
}

export const AppLayoutProviders = ({
  children,
  navigationItems,
  appMenu = [],
  user
}: Pick<
  AppLayoutProps,
  'children' | 'navigationItems' | 'appMenu' | 'user'
>) => (
  <ToolbarActionsProvider>
    <AppMenuShell items={appMenu} navigationItems={navigationItems}>
      <UserProvider initialUser={user}>
        <CommandProvider items={navigationItems}>
          <InfoPanelProvider>
            <WorkspaceNavigationProvider>
              {children}
            </WorkspaceNavigationProvider>
          </InfoPanelProvider>
        </CommandProvider>
      </UserProvider>
    </AppMenuShell>
  </ToolbarActionsProvider>
)

export const AppLayoutView = ({
  children,
  navigationItems,
  controlCenterSlot,
  ...frameProps
}: AppLayoutViewProps) => (
  <AppFrame
    {...frameProps}
    navigation={
      <MenuLayout items={navigationItems} controlCenter={controlCenterSlot} />
    }>
    {children}
  </AppFrame>
)

const AppLayout = ({
  children,
  navigationItems,
  appMenu,
  user,
  settings = false,
  controlCenter,
  controlCenterSlot,
  i18n,
  ...frameProps
}: AppLayoutProps) => {
  const navigate = useNavigate()
  const isSettings = useMatches({
    select: matches =>
      settings && matches.some(match => match.routeId === '/settings')
  })
  const openSettings = useCallback(
    (section: SettingsSection) =>
      navigate({ to: '/settings', search: { section } }),
    [navigate]
  )
  const content = children === undefined ? <Outlet /> : children
  const center =
    controlCenterSlot !== undefined ? (
      controlCenterSlot
    ) : controlCenter ? (
      <ConfiguredControlCenter
        config={controlCenter}
        context={{ i18n }}
        placement="right bottom"
        preview
      />
    ) : undefined
  return (
    <AppLayoutProviders
      navigationItems={navigationItems}
      appMenu={appMenu}
      user={user}>
      <SettingsNavigationContext.Provider
        value={settings ? openSettings : null}>
        {isSettings ? (
          <SettingsLayout>{content}</SettingsLayout>
        ) : (
          <AppLayoutView
            {...frameProps}
            navigationItems={navigationItems}
            controlCenterSlot={center}>
            {content}
          </AppLayoutView>
        )}
      </SettingsNavigationContext.Provider>
    </AppLayoutProviders>
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
