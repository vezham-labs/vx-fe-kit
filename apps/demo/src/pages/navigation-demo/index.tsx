import { Outlet, useLocation } from '@tanstack/react-router'
import { useState } from 'react'

import { SectionLayout } from '@vx/react/layouts/section'

import { getToolbarActions } from './actions'
import { type MenuKey, getNavigationPage } from './navigation'

type Props = { menuKey: MenuKey }

const NavigationDemoLayout = ({ menuKey }: Props) => {
  const { pathname } = useLocation()
  const { items, section, page, tabs } = getNavigationPage(menuKey, pathname)

  const [search, setSearch] = useState('')
  const actions = getToolbarActions(page)

  return (
    <SectionLayout
      title={menuKey === 'tabs' ? 'Demo' : section.title}
      navigationLabel={
        menuKey === 'academic' ? 'Academic sections' : 'Workspace sections'
      }
      sidebarItems={menuKey !== 'tabs' ? items : undefined}
      tabs={tabs}
      {...actions}
      search={{ value: search, onChange: setSearch }}>
      <Outlet />
    </SectionLayout>
  )
}

export default NavigationDemoLayout
