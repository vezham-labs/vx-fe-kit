import {
  defaultLeftActions,
  defaultRightActions
} from '@pages/_shared/layout-actions'
import { createSectionLayout } from '@pages/academic/layout/types'

import {
  operationsCreateExcludedPageKeys as createExcludedPageKeys,
  operationsCreateLabelsByPageKey as createLabelsByPageKey,
  operationsSidebarItems
} from './data'
import { tva } from './variant'

const useOperationsLayoutProps = createSectionLayout({
  defaults: {
    title: 'Operations',
    navigationLabel: 'Operations navigation',
    subNavigationLabel: 'Operations sub navigation',
    createEventPrefix: 'operations',
    collapsedSidebarMode: 'hidden',
    initialSidebarCollapsed: false,
    renderChildrenInSidebar: true,
    sidebarItems: operationsSidebarItems
  },
  defaultLeftActions,
  defaultRightActions,
  createExcludedPageKeys,
  createLabelsByPageKey,
  tva
})

export { useOperationsLayoutProps }
export type { AcademicMenuItem, Props } from '@pages/academic/layout/types'
