import {
  type SortFieldOption,
  sortOrderOptions
} from '../../../pages/academic/shared/sort'
import type {
  ClassFormState,
  ClassRow,
  ClassStatus,
  DatePresetKey,
  ExamResultsColumnOption
} from './types'

export const initialRows: ClassRow[] = [
  {
    id: 'AD9892434',
    name: 'Janet',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'janet.wilson@example.edu',
    rollNo: '35013',
    english: '95',
    spanish: '93',
    physics: '88',
    chemistry: '90',
    maths: '85',
    computer: '98',
    envscience: '95',
    total: '644',
    percent: '92',
    grade: 'O',
    result: 'Pass',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-06',
    viewedAt: '2026-05-07'
  },
  {
    id: 'AD9892433',
    name: 'Joann',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'joann.miller@example.edu',
    rollNo: '35012',
    english: '30',
    spanish: '35',
    physics: '36',
    chemistry: '28',
    maths: '38',
    computer: '40',
    envscience: '37',
    total: '244',
    percent: '34',
    grade: 'F',
    result: 'Fail',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-05',
    viewedAt: '2026-05-06'
  },
  {
    id: 'AD9892432',
    name: 'Kathleen',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    email: 'kathleen.gray@example.edu',
    rollNo: '35011',
    english: '70',
    spanish: '80',
    physics: '85',
    chemistry: '78',
    maths: '82',
    computer: '83',
    envscience: '80',
    total: '558',
    percent: '79',
    grade: 'A',
    result: 'Pass',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-04',
    viewedAt: '2026-05-05'
  },
  {
    id: 'AD9892431',
    name: 'Gifford',
    avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
    email: 'gifford.clark@example.edu',
    rollNo: '35010',
    english: '60',
    spanish: '68',
    physics: '65',
    chemistry: '70',
    maths: '67',
    computer: '72',
    envscience: '75',
    total: '477',
    percent: '68',
    grade: 'B+',
    result: 'Pass',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-03',
    viewedAt: '2026-05-04'
  },
  {
    id: 'AD9892430',
    name: 'Lisa',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    email: 'lisa.parker@example.edu',
    rollNo: '35009',
    english: '36',
    spanish: '30',
    physics: '40',
    chemistry: '38',
    maths: '50',
    computer: '48',
    envscience: '43',
    total: '285',
    percent: '40',
    grade: 'F',
    result: 'Fail',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-02',
    viewedAt: '2026-05-03'
  },
  {
    id: 'AD9892429',
    name: 'Ralph',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    email: 'ralph.turner@example.edu',
    rollNo: '35008',
    english: '43',
    spanish: '50',
    physics: '62',
    chemistry: '70',
    maths: '65',
    computer: '58',
    envscience: '60',
    total: '408',
    percent: '58',
    grade: 'B',
    result: 'Pass',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-02'
  },
  {
    id: 'AD9892428',
    name: 'Julie',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    email: 'julie.bennett@example.edu',
    rollNo: '35007',
    english: '72',
    spanish: '80',
    physics: '75',
    chemistry: '78',
    maths: '84',
    computer: '87',
    envscience: '76',
    total: '552',
    percent: '78',
    grade: 'A',
    result: 'Pass',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-04-30',
    viewedAt: '2026-05-01'
  },
  {
    id: 'AD9892427',
    name: 'Ryan',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    email: 'ryan.cooper@example.edu',
    rollNo: '35006',
    english: '40',
    spanish: '48',
    physics: '42',
    chemistry: '47',
    maths: '32',
    computer: '58',
    envscience: '50',
    total: '317',
    percent: '45',
    grade: 'F',
    result: 'Fail',
    classes: 'V',
    section: 'A',
    examtype: 'Monthly Test',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-30'
  },
  {
    id: 'AD9892426',
    name: 'Marcus',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    email: 'marcus.hall@example.edu',
    rollNo: '35005',
    english: '88',
    spanish: '86',
    physics: '91',
    chemistry: '89',
    maths: '94',
    computer: '92',
    envscience: '87',
    total: '627',
    percent: '89',
    grade: 'A+',
    result: 'Pass',
    classes: 'V',
    section: 'B',
    examtype: 'Monthly Test',
    createdAt: '2026-04-28',
    viewedAt: '2026-04-29'
  },
  {
    id: 'AD9892425',
    name: 'Nora',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    email: 'nora.evans@example.edu',
    rollNo: '35004',
    english: '64',
    spanish: '72',
    physics: '69',
    chemistry: '73',
    maths: '71',
    computer: '76',
    envscience: '68',
    total: '493',
    percent: '70',
    grade: 'B+',
    result: 'Pass',
    classes: 'V',
    section: 'B',
    examtype: 'Monthly Test',
    createdAt: '2026-04-27',
    viewedAt: '2026-04-28'
  },
  {
    id: 'AD9892424',
    name: 'Ethan',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    email: 'ethan.price@example.edu',
    rollNo: '35003',
    english: '29',
    spanish: '42',
    physics: '34',
    chemistry: '39',
    maths: '44',
    computer: '46',
    envscience: '41',
    total: '275',
    percent: '39',
    grade: 'F',
    result: 'Fail',
    classes: 'V',
    section: 'B',
    examtype: 'Monthly Test',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-27'
  },
  {
    id: 'AD9892423',
    name: 'Sofia',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    email: 'sofia.morris@example.edu',
    rollNo: '35002',
    english: '78',
    spanish: '74',
    physics: '82',
    chemistry: '80',
    maths: '86',
    computer: '90',
    envscience: '84',
    total: '574',
    percent: '82',
    grade: 'A',
    result: 'Pass',
    classes: 'V',
    section: 'B',
    examtype: 'Monthly Test',
    createdAt: '2026-04-25',
    viewedAt: '2026-04-26'
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

export const examResultsColumnOptions = [
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
  },
  {
    key: 'total',
    label: 'Total',
    defaultWidth: 120,
    minWidth: 110,
    maxWidth: 150
  },
  {
    key: 'percent',
    label: 'Percent %',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 170
  },
  {
    key: 'grade',
    label: 'Grade',
    defaultWidth: 120,
    minWidth: 110,
    maxWidth: 150
  },
  {
    key: 'result',
    label: 'Result',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  }
] as const satisfies readonly ExamResultsColumnOption[]

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
  ...examResultsColumnOptions.map(option => ({
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
export const roomOptions = [
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '108',
  '109',
  '110'
]
export const dayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export const starttimeOptions = [
  '09.30 AM',
  '10.30 AM',
  '11.30 AM',
  '12.30 PM',
  '01.30 PM',
  '02.30 PM'
]
export const endtimeOptions = [
  '12.30 PM',
  '01.30 PM',
  '02.30 PM',
  '03.30 PM',
  '04.30 PM',
  '05.30 PM'
]
export const statusOptions: ClassStatus[] = ['Pass', 'Fail']

export const emptyForm: ClassFormState = {
  name: '',
  english: '',
  spanish: '',
  physics: '',
  chemistry: '',
  maths: '',
  computer: '',
  envscience: '',
  total: '',
  percent: '',
  grade: '',
  result: 'Pass'
}

export { sortOrderOptions }
