import { getNavigationChildren } from '@generated/navigation'
import { defaultRightActions as baseRightActions } from '@pages/_shared/layout-actions'

import type { AcademicMenuItem, ActionItem } from './types'

export const sidebarItems: AcademicMenuItem[] =
  getNavigationChildren('academic')

export const academicRightActions: ActionItem[] = [
  ...baseRightActions,
  { key: 'create', label: 'Create', icon: 'vx:plus', kind: 'primary' }
]

export const academicCreateLabelsByPageKey: Record<string, string> = {
  allclasses: 'Add Class',
  schedule: 'Add Schedule',
  classroom: 'Add Classroom',
  classroutine: 'Add Class Routine',
  section: 'Add Section',
  syllabus: 'Add Subject Group',
  reasons: 'Add Reactions',
  subject: 'Add Subject',
  timetable: 'Add Timetable',
  homework: 'Add Homework',
  exam: 'Add Exam',
  'exam-schedule': 'Add Exam Schedule',
  grades: 'Add Grades'
}

export const academicCreateExcludedPageKeys = new Set([
  'exam-attendance',
  'exam-results'
])
