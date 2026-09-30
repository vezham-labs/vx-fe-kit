import {
  defaultLeftActions,
  defaultRightActions
} from '@pages/_shared/layout-actions'
import { createSectionLayout } from '@pages/academic/layout/types'

import {
  reportsCreateExcludedPageKeys as createExcludedPageKeys,
  reportsCreateLabelsByPageKey as createLabelsByPageKey,
  reportsSidebarItems
} from './data'
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
  defaultRightActions,
  createExcludedPageKeys,
  createLabelsByPageKey,
  tva
})

export { useReportsLayoutProps }
export type { AcademicMenuItem, Props } from '@pages/academic/layout/types'
