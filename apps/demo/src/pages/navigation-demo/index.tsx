import { Outlet, useLocation } from '@tanstack/react-router'

import { SearchField } from '@vezham/react-v3'

import { SectionLayout } from '@vx/react/layouts/section'

import { type MenuKey, getNavigationPage } from './navigation'

type Props = { menuKey: MenuKey }

const NavigationDemoLayout = ({ menuKey }: Props) => {
  const { pathname } = useLocation()
  const { items, section, tabs } = getNavigationPage(menuKey, pathname)

  return (
    <SectionLayout
      title={menuKey === 'tabs' ? 'Demo' : section.title}
      navigationLabel={
        menuKey === 'academic' ? 'Academic sections' : 'Workspace sections'
      }
      sidebarItems={menuKey !== 'tabs' ? items : undefined}
      tabs={tabs}
      toolbar={
        <SearchField
          aria-label="Search content"
          className="hidden w-56 lg:block">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      }>
      <Outlet />
    </SectionLayout>
  )
}

export default NavigationDemoLayout
