import { getNavigationChildren } from '@generated/navigation'

import type { AcademicMenuItem } from './types'

export const reportsSidebarItems: AcademicMenuItem[] =
  getNavigationChildren('reports')

export const reportsCreateLabelsByPageKey: Record<string, string> = {}

export const reportsCreateExcludedPageKeys = new Set([
  'attendance-report',
  'students-attendance-type',
  'daily-attendance',
  'student-day-wise',
  'teacher-day-wise',
  'staff-day-wise',
  'teacher-report',
  'staff-report'
])
