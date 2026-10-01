import { defaultLeftActions } from '@pages/_shared/layout-actions'
import { createSectionLayout } from '@pages/academic/layout/types'

import { operationsSidebarItems } from './data'
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
  tva
})

export { useOperationsLayoutProps }
export type { AcademicMenuItem, Props } from '@pages/academic/layout/types'
