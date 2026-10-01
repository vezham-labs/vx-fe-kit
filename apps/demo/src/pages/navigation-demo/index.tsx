import { Outlet, useLocation } from '@tanstack/react-router'
import { useState } from 'react'

import { toast } from '@vezham/react-v3'

import { getNavigationToolbar } from '@vx/react'
import { SectionLayout } from '@vx/react/layouts/section'
import { useToolbarAction, useToolbarActions } from '@vx/react/toolbar-actions'

import { navigationItems } from '@generated/navigation'

import { getToolbarActions } from './actions'
import { type MenuKey, getNavigationPage } from './navigation'

type Props = { menuKey: MenuKey }

const NavigationDemoLayout = ({ menuKey }: Props) => {
  const { pathname } = useLocation()
  const { items, section, page, tabs } = getNavigationPage(menuKey, pathname)

  const [search, setSearch] = useState('')
  const toolbar = getNavigationToolbar(navigationItems, pathname)
  const { emit } = useToolbarActions()
  const actions = getToolbarActions(
    toolbar,
    { pageKey: page.key, pathname },
    emit
  )
  useToolbarAction('sync', () => {
    // vx-bot/TODO: Replace this notice with server synchronization.
    toast.info('Server sync is not implemented yet.')
  })
  useToolbarAction('print', () => window.print())
  useToolbarAction('create', () => {
    toast.info('Create is not implemented in this navigation demo.')
  })

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
        emit({ actionKey: 'sync', pageKey: page.key, pathname })
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
