import React from 'react'

import { Surface } from '@vezham/react-v3'

import { CommandProvider } from '../../components/command'
import { InfoPanelProvider } from '../../components/panel/info-panel'
import { WorkspaceNavigationProvider } from '../../components/workspace-navigation'
import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommandProvider>
      <InfoPanelProvider>
        <WorkspaceNavigationProvider>
          <Surface
            variant="transparent"
            data-vx="app-layout"
            className="bg-background flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden md:flex-row">
            <MenuLayout />
            <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto transition-[width,transform] duration-300 ease-out">
              {children}
            </main>
          </Surface>
        </WorkspaceNavigationProvider>
      </InfoPanelProvider>
    </CommandProvider>
  )
}

export { AppLayout }
