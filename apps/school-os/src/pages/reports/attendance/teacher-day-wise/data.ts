import type { SortDescriptor } from '@vezham/react-v3'

import type {
  AttendancePageConfig,
  AttendanceStatus,
  DatePresetKey,
  PersonValue,
  ReportColumn,
  ReportRow
} from './types'

export const rowCountOptions = ['10', '25', '50']

export const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'nextYear', label: 'Next Year' },
  { key: 'custom', label: 'Custom Range' }
]

export const statusLegend: {
  status: AttendanceStatus
  label: string
  icon: string
}[] = [
  { status: 'Present', label: 'Present', icon: 'lucide:check' },
  { status: 'Absent', label: 'Absent', icon: 'lucide:x' },
  { status: 'Late', label: 'Late', icon: 'lucide:clock-3' },
  { status: 'Halfday', label: 'Halfday', icon: 'lucide:calendar-days' },
  { status: 'Holiday', label: 'Holiday', icon: 'lucide:badge-check' }
]

export const studentPeople = [
  person('Janet', 'https://randomuser.me/api/portraits/women/44.jpg'),
  person('Joann', 'https://randomuser.me/api/portraits/men/32.jpg'),
  person('Kathleen', 'https://randomuser.me/api/portraits/women/68.jpg'),
  person('Gifford', 'https://randomuser.me/api/portraits/men/53.jpg'),
  person('Lisa', 'https://randomuser.me/api/portraits/women/17.jpg'),
  person('Ralph', 'https://randomuser.me/api/portraits/men/12.jpg'),
  person('Julie', 'https://randomuser.me/api/portraits/women/8.jpg'),
  person('Ryan', 'https://randomuser.me/api/portraits/men/9.jpg'),
  person('Susan', 'https://randomuser.me/api/portraits/women/28.jpg'),
  person('Richard', 'https://randomuser.me/api/portraits/men/41.jpg'),
  person('Veronica', 'https://randomuser.me/api/portraits/women/55.jpg')
]

export const parentPeople = [
  person('Mary', 'https://randomuser.me/api/portraits/women/6.jpg'),
  person('Michael', 'https://randomuser.me/api/portraits/men/6.jpg'),
  person('Jessie', 'https://randomuser.me/api/portraits/women/40.jpg'),
  person('Robert', 'https://randomuser.me/api/portraits/men/20.jpg'),
  person('Colleen', 'https://randomuser.me/api/portraits/women/22.jpg'),
  person('Arthur', 'https://randomuser.me/api/portraits/men/46.jpg'),
  person('Claudia', 'https://randomuser.me/api/portraits/women/24.jpg'),
  person('Johnson', 'https://randomuser.me/api/portraits/men/54.jpg'),
  person('Marquita', 'https://randomuser.me/api/portraits/women/77.jpg'),
  person('Thomas', 'https://randomuser.me/api/portraits/men/67.jpg')
]

export const teacherPeople = [
  person('Teresa', 'https://randomuser.me/api/portraits/women/1.jpg'),
  person('Daniel', 'https://randomuser.me/api/portraits/men/2.jpg'),
  person('Hellana', 'https://randomuser.me/api/portraits/women/3.jpg'),
  person('Erickson', 'https://randomuser.me/api/portraits/men/4.jpg'),
  person('Morgan', 'https://randomuser.me/api/portraits/men/5.jpg'),
  person('Aaron', 'https://randomuser.me/api/portraits/men/7.jpg'),
  person('Jacquelin', 'https://randomuser.me/api/portraits/women/9.jpg'),
  person('Raul', 'https://randomuser.me/api/portraits/men/10.jpg'),
  person('Elizabeth', 'https://randomuser.me/api/portraits/women/11.jpg'),
  person('Edward', 'https://randomuser.me/api/portraits/men/13.jpg')
]

export const staffPeople = [
  person('Hellana', 'https://randomuser.me/api/portraits/women/3.jpg'),
  person('Daniel', 'https://randomuser.me/api/portraits/men/2.jpg'),
  person('Kevin', 'https://randomuser.me/api/portraits/men/31.jpg'),
  person('Teresa', 'https://randomuser.me/api/portraits/women/1.jpg'),
  person('James', 'https://randomuser.me/api/portraits/men/34.jpg'),
  person('Johnson', 'https://randomuser.me/api/portraits/men/54.jpg'),
  person('Edward', 'https://randomuser.me/api/portraits/men/13.jpg'),
  person('Jacquelin', 'https://randomuser.me/api/portraits/women/9.jpg'),
  person('Elizabeth', 'https://randomuser.me/api/portraits/women/11.jpg'),
  person('Willie', 'https://randomuser.me/api/portraits/men/36.jpg')
]

export const dayColumns = Array.from({ length: 31 }, (_, index) => {
  const day = String(index + 1).padStart(2, '0')
  const weekDay = ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index % 7]

  return {
    key: `day${day}`,
    label: `${day}\n${weekDay}`,
    type: 'marker',
    minWidth: 38
  } satisfies ReportColumn
})

export const summaryColumns: ReportColumn[] = [
  { key: 'person', label: 'Teacher / Date', type: 'person', minWidth: 140 },
  { key: 'percent', label: '%', type: 'percent', allowsSorting: true },
  { key: 'present', label: 'P', allowsSorting: true },
  { key: 'late', label: 'L', allowsSorting: true },
  { key: 'absent', label: 'A', allowsSorting: true },
  { key: 'halfday', label: 'H', allowsSorting: true },
  { key: 'holiday', label: 'F', allowsSorting: true },
  ...dayColumns
]

export const studentAttendanceTypeColumns: ReportColumn[] = [
  {
    key: 'admissionNo',
    label: 'Admission No',
    type: 'link',
    allowsSorting: true
  },
  { key: 'admissionDate', label: 'Date of Admission', allowsSorting: true },
  {
    key: 'student',
    label: 'Student Name',
    type: 'person',
    allowsSorting: true
  },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'dob', label: 'Date of Birth', allowsSorting: true },
  { key: 'parent', label: 'Parent Name', type: 'person', allowsSorting: true },
  { key: 'count', label: 'Count', allowsSorting: true }
]

export const studentDayWiseColumns: ReportColumn[] = [
  { key: 'serialNo', label: 'S.No', allowsSorting: true },
  {
    key: 'admissionNo',
    label: 'Admission No',
    type: 'link',
    allowsSorting: true
  },
  { key: 'rollNo', label: 'Roll No', allowsSorting: true },
  { key: 'student', label: 'Name', type: 'person', allowsSorting: true },
  {
    key: 'attendance',
    label: 'Attendance',
    type: 'status',
    allowsSorting: true
  }
]

export const teacherDayWiseColumns: ReportColumn[] = [
  { key: 'serialNo', label: 'S.No', allowsSorting: true },
  { key: 'teacherId', label: 'ID', type: 'link', allowsSorting: true },
  { key: 'person', label: 'Name', type: 'person', allowsSorting: true },
  { key: 'subject', label: 'Subject', allowsSorting: true },
  {
    key: 'attendance',
    label: 'Attendance',
    type: 'status',
    allowsSorting: true
  }
]

export const staffDayWiseColumns: ReportColumn[] = [
  { key: 'serialNo', label: 'S.No', allowsSorting: true },
  { key: 'staffId', label: 'ID', type: 'link', allowsSorting: true },
  { key: 'person', label: 'Name', type: 'person', allowsSorting: true },
  { key: 'department', label: 'Department', allowsSorting: true },
  { key: 'role', label: 'Role', allowsSorting: true },
  {
    key: 'attendance',
    label: 'Attendance',
    type: 'status',
    allowsSorting: true
  }
]

export function makeAttendanceConfig(config: {
  key: string
  title: string
  ariaLabel: string
  columns: ReportColumn[]
  rows: ReportRow[]
  filters: AttendancePageConfig['filters']
  initialColumn: string
  tableMinWidth: number
  showStatusLegend?: boolean
}): AttendancePageConfig {
  const initialSort = {
    column: config.initialColumn,
    direction: 'ascending'
  } satisfies SortDescriptor

  return {
    ...config,
    initialSort,
    sortOptions: [
      { key: 'ascending', label: 'Ascending', descriptor: initialSort },
      {
        key: 'descending',
        label: 'Descending',
        descriptor: {
          column: config.initialColumn,
          direction: 'descending'
        } satisfies SortDescriptor
      },
      {
        key: 'recentlyViewed',
        label: 'Recently Viewed',
        descriptor: {
          column: 'viewedAt',
          direction: 'descending'
        } satisfies SortDescriptor
      },
      {
        key: 'recentlyAdded',
        label: 'Recently Added',
        descriptor: {
          column: 'createdAt',
          direction: 'descending'
        } satisfies SortDescriptor
      }
    ]
  }
}

export function makeStudentsAttendanceTypeRows(): ReportRow[] {
  const admissionDates = [
    '25 Mar 2024',
    '18 Mar 2024',
    '14 Mar 2024',
    '27 Feb 2024',
    '13 Feb 2024',
    '11 Feb 2024',
    '24 Jan 2024',
    '19 Jan 2024',
    '08 Jan 2024',
    '22 Dec 2024',
    '15 Dec 2024'
  ]
  const classes = [
    'III',
    'IV',
    'II',
    'I',
    'II',
    'III',
    'V',
    'VI',
    'VIII',
    'VII',
    'IX'
  ]
  const birthDates = [
    '10 Jan 2015',
    '19 Aug 2014',
    '05 Dec 2017',
    '22 Mar 2018',
    '13 May 2017',
    '20 Jun 2015',
    '18 Sep 2013',
    '26 Nov 2012',
    '26 May 2010',
    '06 Oct 2011',
    '27 Dec 2009'
  ]
  const counts = [22, 15, 24, 22, 22, 24, 24, 24, 24, 24, 24]

  return studentPeople.map((student, index) => ({
    id: `student-type-${index}`,
    admissionNo: `AD9892${434 - index}`,
    admissionDate: admissionDates[index],
    student,
    className: classes[index],
    dob: birthDates[index],
    parent: parentPeople[index % parentPeople.length],
    count: counts[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export function makeDailyAttendanceRows(): ReportRow[] {
  return [
    ['III', 'A', 69, 2, '98%', '2%'],
    ['IV', 'A', 45, 7, '78%', '22%'],
    ['II', 'B', 69, 8, '89%', '11%'],
    ['I', 'C', 54, 7, '99%', '1%'],
    ['II', 'A', 65, 1, '98%', '2%'],
    ['III', 'B', 78, '.2', '72%', '28%'],
    ['V', 'C', 65, 0, '100%', '0%'],
    ['VI', 'A', 45, 2, '99%', '11%'],
    ['VIII', 'B', 47, 2, '98%', '2%'],
    ['VII', 'C', 45, 7, '89%', '11%'],
    ['IX', 'A', 45, 1, '98%', '2%']
  ].map(
    (
      [
        className,
        section,
        totalPresent,
        totalAbsent,
        presentPercent,
        absentPercent
      ],
      index
    ) => ({
      id: `daily-${index}`,
      className,
      section,
      totalPresent,
      totalAbsent,
      presentPercent,
      absentPercent,
      createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
    })
  )
}

export function makeStudentDayWiseRows(): ReportRow[] {
  const statuses: AttendanceStatus[] = [
    'Present',
    'Present',
    'Half Day',
    'Present',
    'Absent',
    'Late',
    'Present',
    'Present',
    'Absent',
    'Present'
  ]

  return studentPeople.slice(0, 10).map((student, index) => ({
    id: `student-day-${index}`,
    serialNo: index + 1,
    admissionNo: `AD9892${434 - index}`,
    rollNo: 35013 - index,
    student,
    attendance: statuses[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export function makeTeacherDayWiseRows(): ReportRow[] {
  const subjects = [
    'Physics',
    'Computer',
    'English',
    'Spanish',
    'Env Science',
    'Chemistry',
    'Maths',
    'Biology',
    'Economics',
    'Finance'
  ]
  const statuses: AttendanceStatus[] = [
    'Present',
    'Present',
    'Absent',
    'Present',
    'Half Day',
    'Present',
    'Present',
    'Late',
    'Present',
    'Present'
  ]

  return teacherPeople.map((teacher, index) => ({
    id: `teacher-day-${index}`,
    serialNo: index + 1,
    teacherId: `T8491${27 - index}`,
    person: teacher,
    subject: subjects[index],
    attendance: statuses[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export function makeStaffDayWiseRows(): ReportRow[] {
  const departments = [
    'Management',
    'Finance',
    'Management',
    'Finance',
    'Management',
    'Admin',
    'Transport',
    'Library',
    'Management',
    'Management'
  ]
  const roles = [
    'Receptionist',
    'Accounts Manager',
    'Driver',
    'Librarian',
    'HR Manager',
    'Accountant',
    'Admin',
    'Admin',
    'Receptionist',
    'Technical Head'
  ]
  const statuses: AttendanceStatus[] = [
    'Present',
    'Present',
    'Absent',
    'Present',
    'Half Day',
    'Present',
    'Present',
    'Late',
    'Present',
    'Present'
  ]

  return staffPeople.map((staff, index) => ({
    id: `staff-day-${index}`,
    serialNo: 1,
    staffId: 8483 - index,
    person: staff,
    department: departments[index],
    role: roles[index],
    attendance: statuses[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export function makeSummaryRows(people: PersonValue[]): ReportRow[] {
  const percents = [100, 87, 95, 94, 45, 100, 95, 99, 98, 32]
  const totals = [
    [24, 0, 0, 6, 0],
    [22, 1, 1, 6, 1],
    [23, 1, 2, 6, 1],
    [23, 1, 3, 6, 1],
    [16, 2, 1, 6, 1],
    [24, 2, 1, 6, 0],
    [21, 2, 1, 6, 2],
    [22, 0, 4, 6, 1],
    [23, 0, 2, 6, 1],
    [20, 3, 1, 6, 4]
  ]
  const markers: AttendanceStatus[] = [
    'Present',
    'Present',
    'Present',
    'Absent',
    'Present',
    'Holiday',
    'Holiday',
    'Present',
    'Present',
    'Present',
    'Present',
    'Present',
    'Late',
    'Late',
    'Holiday',
    'Holiday',
    'Present',
    'Present',
    'Holiday',
    'Present',
    'Present',
    'Present',
    'Present',
    'Absent',
    'Present',
    'Late',
    'Holiday',
    'Present',
    'Present',
    'Present'
  ]

  return people.map((personValue, index) => {
    const [present, late, absent, halfday, holiday] = totals[index]
    const row: ReportRow = {
      id: `summary-${personValue.name}-${index}`,
      person: personValue,
      percent: percents[index],
      present,
      late,
      absent,
      halfday,
      holiday,
      createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
    }

    dayColumns.forEach((column, dayIndex) => {
      row[column.key] =
        index === 0
          ? markers[dayIndex % markers.length] === 'Absent'
            ? 'Present'
            : markers[dayIndex % markers.length]
          : markers[(dayIndex + index) % markers.length]
    })

    return row
  })
}

export function option(key: string, label: string, values: string[]) {
  return { key, label, values }
}

function person(name: string, avatar: string) {
  return { name, avatar }
}

export const teacherDayWiseConfig = makeAttendanceConfig({
  key: 'teacher-day-wise',
  title: 'Teacher Day Wise List',
  ariaLabel: 'Teacher day wise',
  columns: teacherDayWiseColumns,
  rows: makeTeacherDayWiseRows(),
  filters: [
    option('subject', 'Subject', [
      'Physics',
      'Computer',
      'English',
      'Spanish',
      'Env Science',
      'Chemistry',
      'Maths',
      'Biology',
      'Economics',
      'Finance'
    ]),
    option('attendance', 'Attendance', [
      'Present',
      'Absent',
      'Late',
      'Half Day'
    ])
  ],
  initialColumn: 'serialNo',
  tableMinWidth: 900
})
