import { defaultRightActions as baseRightActions } from '@pages/_shared/layout-actions'

import type { AcademicMenuItem, ActionItem } from './types'

export const sidebarItems: AcademicMenuItem[] = [
  {
    key: 'classes',
    title: 'Classes',
    href: '/academic/classes',
    icon: 'vx:book-open',
    children: [
      {
        key: 'allclasses',
        title: 'All Classes',
        href: '/academic/classes/allclasses',
        icon: 'vx:list'
      },
      {
        key: 'schedule',
        title: 'Schedule',
        href: '/academic/classes/schedule',
        icon: 'vx:calendar-clock'
      }
    ]
  },
  {
    key: 'classroom',
    title: 'Class Room',
    href: '/academic/classroom',
    icon: 'vx:grid'
  },
  {
    key: 'classroutine',
    title: 'Class Routine',
    href: '/academic/class-routine',
    icon: 'vx:calendar-days'
  },
  {
    key: 'section',
    title: 'Section',
    href: '/academic/section',
    icon: 'vx:sidebar'
  },
  {
    key: 'subject',
    title: 'Subject',
    href: '/academic/subject',
    icon: 'vx:book'
  },
  {
    key: 'syllabus',
    title: 'Syllabus',
    href: '/academic/syllabus',
    icon: 'vx:file-text'
  },
  {
    key: 'timetable',
    title: 'Time Table',
    href: '/academic/timetable',
    icon: 'vx:clock'
  },
  {
    key: 'homework',
    title: 'Home Work',
    href: '/academic/homework',
    icon: 'vx:clipboard-list'
  },
  {
    key: 'examinations',
    title: 'Examinations',
    href: '/academic/examinations',
    icon: 'vx:academic-cap',
    children: [
      {
        key: 'exam',
        title: 'Exam',
        href: '/academic/examinations/exam',
        icon: 'vx:document-edit'
      },
      {
        key: 'exam-schedule',
        title: 'Exam Schedule',
        href: '/academic/examinations/exam-schedule',
        icon: 'vx:calendar-check'
      },
      {
        key: 'grades',
        title: 'Grades',
        href: '/academic/examinations/grades',
        icon: 'vx:verified'
      },
      {
        key: 'exam-attendance',
        title: 'Exam Attendance',
        href: '/academic/examinations/exam-attendance',
        icon: 'vx:user-check'
      },
      {
        key: 'exam-results',
        title: 'Exam Results',
        href: '/academic/examinations/exam-results',
        icon: 'vx:chart'
      }
    ]
  },
  {
    key: 'reasons',
    title: 'Reasons',
    href: '/academic/reasons',
    icon: 'vx:help'
  }
]

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
