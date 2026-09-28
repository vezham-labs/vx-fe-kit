import type { SortDescriptor } from '@vezham/react-v3'

import type {
  OperationColumn,
  OperationPageConfig
} from '../../../../pages/operations/_shared/types'
import type { RouteItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'routeName',
    label: 'Routes',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'addedOn',
    label: 'Added On',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]

export const routesData: RouteItem[] = [
  {
    id: 'route-0',
    createdAt: '2026-05-11',
    displayId: 'R124556',
    routeName: 'Seattle',
    status: 'Active',
    addedOn: '15 May 2024'
  },
  {
    id: 'route-1',
    createdAt: '2026-05-10',
    displayId: 'R124555',
    routeName: 'Brooklyn Central',
    status: 'Active',
    addedOn: '14 May 2024'
  },
  {
    id: 'route-2',
    createdAt: '2026-05-09',
    displayId: 'R124554',
    routeName: 'Rochester',
    status: 'Active',
    addedOn: '13 May 2024'
  },
  {
    id: 'route-3',
    createdAt: '2026-05-08',
    displayId: 'R124553',
    routeName: 'Kansas City',
    status: 'Active',
    addedOn: '12 May 2024'
  },
  {
    id: 'route-4',
    createdAt: '2026-05-07',
    displayId: 'RR124552',
    routeName: 'Brooklyn North',
    status: 'Active',
    addedOn: '11 May 2024'
  },
  {
    id: 'route-5',
    createdAt: '2026-05-06',
    displayId: 'R124551',
    routeName: 'Port Graham',
    status: 'Active',
    addedOn: '10 May 2024'
  },
  {
    id: 'route-6',
    createdAt: '2026-05-05',
    displayId: 'R124550',
    routeName: 'Nashville',
    status: 'Active',
    addedOn: '09 May 2024'
  },
  {
    id: 'route-7',
    createdAt: '2026-05-11',
    displayId: 'R12455-1',
    routeName: 'Detroit',
    status: 'Inactive',
    addedOn: '08 May 2024'
  },
  {
    id: 'route-8',
    createdAt: '2026-05-10',
    displayId: 'R12455-2',
    routeName: 'Camden',
    status: 'Active',
    addedOn: '07 May 2024'
  },
  {
    id: 'route-9',
    createdAt: '2026-05-09',
    displayId: 'R12455-3',
    routeName: 'Terra Bella',
    status: 'Active',
    addedOn: '07 May 2024'
  }
]

export const routesConfig = makeConfig({
  key: 'routes',
  title: 'Routes',
  pageTitle: 'Routes',
  listTitle: 'Routes',
  addLabel: 'Add Route',
  ariaLabel: 'Routes',
  breadcrumb: ['Dashboard', 'Management', 'Routes'],
  columns,
  rows: routesData,
  filters: [
    {
      key: 'routes',
      label: 'Routes',
      values: routesData.map(row => row.routeName)
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    }
  ],
  initialColumn: 'routeName',
  tableMinWidth: 980
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
