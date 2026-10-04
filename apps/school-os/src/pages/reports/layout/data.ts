import { getNavigationChildren } from '@generated/navigation'

import type { AcademicMenuItem } from './types'

export const reportsSidebarItems: AcademicMenuItem[] =
  getNavigationChildren('reports')
