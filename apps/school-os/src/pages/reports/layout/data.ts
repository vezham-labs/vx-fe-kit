import type { AcademicMenuItem, ActionItem } from './types'

export const reportsSidebarItems: AcademicMenuItem[] = [
  {
    key: 'attendance',
    title: 'Attendance Reports',
    href: '/reports/attendance',
    icon: 'vx:calendar-check',
    children: [
      {
        key: 'attendance-report',
        title: 'Attendance Report',
        href: '/reports/attendance/attendance-report',
        icon: 'vx:report'
      },
      {
        key: 'students-attendance-type',
        title: 'Students Attendance Type',
        href: '/reports/attendance/students-attendance-type',
        icon: 'vx:user-round-check'
      },
      {
        key: 'daily-attendance',
        title: 'Daily Attendance',
        href: '/reports/attendance/daily-attendance',
        icon: 'vx:calendar-days'
      },
      {
        key: 'student-day-wise',
        title: 'Student Day Wise',
        href: '/reports/attendance/student-day-wise',
        icon: 'vx:user'
      },
      {
        key: 'teacher-day-wise',
        title: 'Teacher Day Wise',
        href: '/reports/attendance/teacher-day-wise',
        icon: 'vx:academic-cap'
      },
      {
        key: 'staff-day-wise',
        title: 'Staff Day Wise',
        href: '/reports/attendance/staff-day-wise',
        icon: 'vx:briefcase'
      },
      {
        key: 'teacher-report',
        title: 'Teacher Report',
        href: '/reports/attendance/teacher-report',
        icon: 'vx:clipboard-list'
      },
      {
        key: 'staff-report',
        title: 'Staff Report',
        href: '/reports/attendance/staff-report',
        icon: 'vx:clipboard-list'
      }
    ]
  },
  {
    key: 'class',
    title: 'Class Reports',
    href: '/reports/class',
    icon: 'vx:school'
  },
  {
    key: 'student',
    title: 'Student Reports',
    href: '/reports/student',
    icon: 'vx:users'
  },
  {
    key: 'grade',
    title: 'Grade Reports',
    href: '/reports/grade',
    icon: 'vx:verified'
  },
  {
    key: 'leave',
    title: 'Leave Reports',
    href: '/reports/leave',
    icon: 'vx:calendar-minus'
  },
  {
    key: 'fees',
    title: 'Fees Reports',
    href: '/reports/fees',
    icon: 'vx:receipt'
  }
]

export const defaultLeftActions: ActionItem[] = [
  {
    key: 'back',
    label: 'Back',
    icon: 'vx:arrow-left',
    onAction: () => window.history.back()
  },
  {
    key: 'forward',
    label: 'Forward',
    icon: 'vx:arrow-right',
    onAction: () => window.history.forward()
  }
]

export const defaultRightActions: ActionItem[] = [
  {
    key: 'search',
    label: 'Search',
    icon: 'vx:search',
    kind: 'search'
  },
  {
    key: 'import',
    label: 'Import',
    icon: 'vx:upload',
    kind: 'menu'
  },
  {
    key: 'print',
    label: 'Print',
    icon: 'vx:printer',
    kind: 'menu',
    onAction: () => window.print()
  },
  {
    key: 'export',
    label: 'Export',
    icon: 'vx:download',
    kind: 'menu'
  },
  {
    key: 'refresh',
    label: 'Refresh',
    icon: 'vx:refresh',
    kind: 'refresh',
    onAction: () => window.location.reload()
  }
]

export const createLabelsByPageKey: Record<string, string> = {}

export const createExcludedPageKeys = new Set([
  'attendance-report',
  'students-attendance-type',
  'daily-attendance',
  'student-day-wise',
  'teacher-day-wise',
  'staff-day-wise',
  'teacher-report',
  'staff-report'
])
