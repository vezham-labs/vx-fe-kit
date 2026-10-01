import { Outlet, useLocation } from '@tanstack/react-router'
import { useState } from 'react'

import { toast } from '@vezham/react-v3'

import { getNavigationToolbar } from '@vx/react'
import { SectionLayout } from '@vx/react/layouts/section'

import { navigationItems } from '@generated/navigation'

import { getToolbarActions } from './actions'
import { type MenuKey, getNavigationPage } from './navigation'

type Props = { menuKey: MenuKey }

const NavigationDemoLayout = ({ menuKey }: Props) => {
  const { pathname } = useLocation()
  const { items, section, page, tabs } = getNavigationPage(menuKey, pathname)

  const [search, setSearch] = useState('')
  const toolbar = getNavigationToolbar(navigationItems, pathname)
  const actions = getToolbarActions(toolbar, page.key)

  return (
    <SectionLayout
      title={menuKey === 'tabs' ? 'Demo' : section.title}
      navigationLabel={
        menuKey === 'academic' ? 'Academic sections' : 'Workspace sections'
      }
      sidebarItems={menuKey !== 'tabs' ? items : undefined}
      tabs={tabs}
      {...actions}
      onSync={() => {
        // vx-bot/TODO: Replace this notice with server synchronization.
        toast.info('Server sync is not implemented yet.')
      }}
      search={
        toolbar.search
          ? { ...toolbar.search, value: search, onChange: setSearch }
          : undefined
      }>
      <Outlet />
    </SectionLayout>
  )
}

export default NavigationDemoLayout
