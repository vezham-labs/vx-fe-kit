import { getNavigationChildren } from '@generated/navigation'

import type { AcademicMenuItem } from './types'

export const operationsSidebarItems: AcademicMenuItem[] =
  getNavigationChildren('operations')
