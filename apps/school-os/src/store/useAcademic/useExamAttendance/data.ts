import {
  type SortFieldOption,
  sortOrderOptions
} from '../../../pages/academic/shared/sort'
import type {
  AttendanceColumnOption,
  AttendanceFormState,
  AttendanceRow,
  AttendanceStatus,
  DatePresetKey
} from './types'

export const initialRows: AttendanceRow[] = [
  {
    id: 'EA123794',
    name: 'Janet',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'janet.wilson@example.edu',
    rollNo: '35013',
    english: 'Present',
    spanish: 'Present',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Present',
    computer: 'Present',
    envscience: 'Present',
    status: 'Present',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-07',
    viewedAt: '2026-05-07'
  },
  {
    id: 'EA123793',
    name: 'Joann',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'joann.miller@example.edu',
    rollNo: '35012',
    english: 'Present',
    spanish: 'Absent',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Present',
    computer: 'Present',
    envscience: 'Present',
    status: 'Absent',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-06',
    viewedAt: '2026-05-07'
  },
  {
    id: 'EA123792',
    name: 'Kathleen',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    email: 'kathleen.gray@example.edu',
    rollNo: '35011',
    english: 'Present',
    spanish: 'Present',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Absent',
    computer: 'Present',
    envscience: 'Present',
    status: 'Absent',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-05',
    viewedAt: '2026-05-06'
  },
  {
    id: 'EA123791',
    name: 'Gifford',
    avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
    email: 'gifford.clark@example.edu',
    rollNo: '35010',
    english: 'Present',
    spanish: 'Present',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Present',
    computer: 'Present',
    envscience: 'Present',
    status: 'Present',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-04',
    viewedAt: '2026-05-05'
  },
  {
    id: 'EA123790',
    name: 'Lisa',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    email: 'lisa.parker@example.edu',
    rollNo: '35009',
    english: 'Present',
    spanish: 'Present',
    physics: 'Late',
    chemistry: 'Present',
    maths: 'Present',
    computer: 'Present',
    envscience: 'Present',
    status: 'Late',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-03',
    viewedAt: '2026-05-04'
  },
  {
    id: 'EA123789',
    name: 'Ralph',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    email: 'ralph.turner@example.edu',
    rollNo: '35008',
    english: 'Present',
    spanish: 'Present',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Present',
    computer: 'Present',
    envscience: 'Present',
    status: 'Present',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-02',
    viewedAt: '2026-05-03'
  },
  {
    id: 'EA123788',
    name: 'Julie',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    email: 'julie.bennett@example.edu',
    rollNo: '35007',
    english: 'Present',
    spanish: 'Present',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Late',
    computer: 'Present',
    envscience: 'Present',
    status: 'Late',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-02'
  },
  {
    id: 'EA123787',
    name: 'Ryan',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    email: 'ryan.cooper@example.edu',
    rollNo: '35006',
    english: 'Present',
    spanish: 'Absent',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Present',
    computer: 'Present',
    envscience: 'Present',
    status: 'Absent',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-04-30',
    viewedAt: '2026-05-01'
  },
  {
    id: 'EA123786',
    name: 'Susan',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    email: 'susan.hall@example.edu',
    rollNo: '35004',
    english: 'Present',
    spanish: 'Present',
    physics: 'Present',
    chemistry: 'Present',
    maths: 'Present',
    computer: 'Absent',
    envscience: 'Present',
    status: 'Absent',
    classes: 'V',
    section: 'B',
    examtype: 'Monthly Test',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-30'
  },
  {
    id: 'EA123785',
    name: 'Nora',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    email: 'nora.evans@example.edu',
    rollNo: '35003',
    english: 'Present',
    spanish: 'Present',
    physics: 'Present',
    chemistry: 'Late',
    maths: 'Present',
    computer: 'Present',
    envscience: 'Present',
    status: 'Late',
    classes: 'V',
    section: 'B',
    examtype: 'Monthly Test',
    createdAt: '2026-04-28',
    viewedAt: '2026-04-29'
  }
]

export const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'nextYear', label: 'Next Year' },
  { key: 'custom', label: 'Custom Range' }
]

export const attendanceColumnOptions = [
  {
    key: 'id',
    label: 'Admission No',
    defaultWidth: 180,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'name',
    label: 'Student Name',
    defaultWidth: 220,
    minWidth: 180,
    maxWidth: 280
  },
  {
    key: 'english',
    label: 'English',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'spanish',
    label: 'Spanish',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'physics',
    label: 'Physics',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'chemistry',
    label: 'Chemistry',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'maths',
    label: 'Maths',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'computer',
    label: 'Computer',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'envscience',
    label: 'Env Science',
    defaultWidth: 150,
    minWidth: 130,
    maxWidth: 180
  }
] as const satisfies readonly AttendanceColumnOption[]

export const sortOptions = [
  {
    key: 'recentlyViewed',
    label: 'Recently Viewed',
    column: 'viewedAt'
  },
  {
    key: 'recentlyAdded',
    label: 'Recently Added',
    column: 'createdAt'
  },
  ...attendanceColumnOptions.map(option => ({
    key: option.key,
    label: option.label,
    column: option.key
  }))
] satisfies readonly SortFieldOption[]

export const rowCountOptions = ['5', '10', '25', '50']
export const classOptions = ['I', 'II', 'III', 'IV', 'V']
export const sectionOptions = ['A', 'B', 'C', 'D', 'E']
export const examtypeOptions = [
  'Weekly Test',
  'Unit Test',
  'Monthly Test',
  'Chapter Wise Test',
  'Progress Test'
]
export const statusOptions: AttendanceStatus[] = ['Present', 'Absent', 'Late']
export { sortOrderOptions }

export const emptyForm: AttendanceFormState = {
  name: '',
  english: 'Present',
  spanish: 'Present',
  physics: 'Present',
  chemistry: 'Present',
  maths: 'Present',
  computer: 'Present',
  envscience: 'Present',
  status: 'Present'
}
