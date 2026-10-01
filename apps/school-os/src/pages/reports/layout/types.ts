import { defaultLeftActions } from '@pages/_shared/layout-actions'
import { createSectionLayout } from '@pages/academic/layout/types'

import { reportsSidebarItems } from './data'
import { tva } from './variant'

const useReportsLayoutProps = createSectionLayout({
  defaults: {
    title: 'Reports',
    navigationLabel: 'Reports navigation',
    subNavigationLabel: 'Reports sub navigation',
    createEventPrefix: 'reports',
    collapsedSidebarMode: 'hidden',
    initialSidebarCollapsed: false,
    renderChildrenInSidebar: true,
    sidebarItems: reportsSidebarItems
  },
  defaultLeftActions,
  tva
})

export { useReportsLayoutProps }
export type { AcademicMenuItem, Props } from '@pages/academic/layout/types'
