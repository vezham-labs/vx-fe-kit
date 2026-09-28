import type { SortDescriptor } from '@vezham/react-v3'

import type {
  OperationColumn,
  OperationPageConfig
} from '../../../../pages/operations/_shared/types'
import type { ReturnItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'dateOfIssue',
    label: 'Date of Issue',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'dueDate',
    label: 'Due Date',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'issueTo',
    label: 'Issue To',
    type: 'person',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'booksIssued',
    label: 'Books Issued',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'bookReturned',
    label: 'Book Returned',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'remarks',
    label: 'Issue Remarks',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]

export const returnData: ReturnItem[] = [
  {
    id: 'return-0',
    createdAt: '2026-05-11',
    displayId: 'IB853629',
    dateOfIssue: '15 May 2024',
    dueDate: '19 May 2024',
    issueTo: {
      name: 'Janet',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    booksIssued: 1,
    bookReturned: 0,
    remarks: 'Book Issued'
  },
  {
    id: 'return-1',
    createdAt: '2026-05-10',
    displayId: 'IB853628',
    dateOfIssue: '14 May 2024',
    dueDate: '20 May 2024',
    issueTo: {
      name: 'Joann',
      subtitle: 'IV, B',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    },
    booksIssued: 5,
    bookReturned: 3,
    remarks: 'Book Issued'
  },
  {
    id: 'return-2',
    createdAt: '2026-05-09',
    displayId: 'IB853627',
    dateOfIssue: '13 May 2024',
    dueDate: '01 Jun 2024',
    issueTo: {
      name: 'Kathleen',
      subtitle: 'I, B',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    booksIssued: 4,
    bookReturned: 2,
    remarks: 'Book Issued'
  },
  {
    id: 'return-3',
    createdAt: '2026-05-08',
    displayId: 'IB853626',
    dateOfIssue: '12 May 2024',
    dueDate: '15 Jun 2024',
    issueTo: {
      name: 'Gifford',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    booksIssued: 3,
    bookReturned: 2,
    remarks: 'Book Issued'
  },
  {
    id: 'return-4',
    createdAt: '2026-05-07',
    displayId: 'IB853625',
    dateOfIssue: '11 May 2024',
    dueDate: '20 Jun 2024',
    issueTo: {
      name: 'Lisa',
      subtitle: 'IV, B',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
    },
    booksIssued: 6,
    bookReturned: 4,
    remarks: 'Book Issued'
  },
  {
    id: 'return-5',
    createdAt: '2026-05-06',
    displayId: 'IB853624',
    dateOfIssue: '10 May 2024',
    dueDate: '19 May 2024',
    issueTo: {
      name: 'Ralph',
      subtitle: 'I, B',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    booksIssued: 4,
    bookReturned: 2,
    remarks: 'Book Issued'
  },
  {
    id: 'return-6',
    createdAt: '2026-05-05',
    displayId: 'IB853623',
    dateOfIssue: '09 May 2024',
    dueDate: '20 May 2024',
    issueTo: {
      name: 'Julie',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    booksIssued: 5,
    bookReturned: 3,
    remarks: 'Book Issued'
  },
  {
    id: 'return-7',
    createdAt: '2026-05-11',
    displayId: 'IB853622',
    dateOfIssue: '08 May 2024',
    dueDate: '01 Jun 2024',
    issueTo: {
      name: 'Ryan',
      subtitle: 'IV, B',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
    },
    booksIssued: 3,
    bookReturned: 1,
    remarks: 'Book Issued'
  },
  {
    id: 'return-8',
    createdAt: '2026-05-10',
    displayId: 'IB853621',
    dateOfIssue: '07 May 2024',
    dueDate: '15 Jun 2024',
    issueTo: {
      name: 'Susan',
      subtitle: 'I, B',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
    },
    booksIssued: 6,
    bookReturned: 4,
    remarks: 'Book Issued'
  },
  {
    id: 'return-9',
    createdAt: '2026-05-09',
    displayId: 'IB853620',
    dateOfIssue: '07 May 2024',
    dueDate: '20 Jun 2024',
    issueTo: {
      name: 'Richard',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    booksIssued: 2,
    bookReturned: 1,
    remarks: 'Book Issued'
  }
]

export const returnBooksConfig = makeConfig({
  key: 'return',
  title: 'Return Books',
  pageTitle: 'Return Books',
  listTitle: 'Return Books',
  addLabel: 'Return Book',
  ariaLabel: 'Return Books',
  breadcrumb: ['Dashboard', 'Management', 'Return Books'],
  columns,
  rows: returnData,
  filters: [
    {
      key: 'issuebook',
      label: 'Issue Book',
      values: returnData.map(row => row.dateOfIssue)
    },
    {
      key: 'name',
      label: 'Name',
      values: returnData.map(row => row.issueTo.name)
    },
    {
      key: 'morefilters',
      label: 'More Filters',
      values: [
        'ID',
        'Date of Issue',
        'Due Date',
        'Issue To',
        'Books Issued',
        'Books Returned',
        'Issue Remarks'
      ]
    }
  ],
  initialColumn: 'issueTo',
  tableMinWidth: 1280
})

function makeConfig(
  config: Omit<OperationPageConfig, 'initialSort' | 'sortOptions'> & {
    initialColumn: string
  }
): OperationPageConfig {
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
