import { getNavigationChildren } from '@generated/navigation'

import type { AcademicMenuItem } from './types'

export const sidebarItems: AcademicMenuItem[] =
  getNavigationChildren('academic')
