import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Surface, cn } from '@vezham/react-v3'

import { CommandProvider } from '../../components/command'
import { InfoPanelProvider } from '../../components/panel/info-panel'
import { WorkspaceNavigationProvider } from '../../components/workspace-navigation'
import type { AppNavigationItem } from '../../navigation'
import { UserProvider, type User } from '../../store/users/useUserStore'
import MenuLayout from '../menu-layout'

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
  user?: User | null
}

const AppLayout = ({
  children,
  navigationItems,
  user,
  ...frameProps
}: AppLayoutProps) => {
  return (
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
  )
}

export { AppFrame, AppLayout }
export type { AppFrameProps }
