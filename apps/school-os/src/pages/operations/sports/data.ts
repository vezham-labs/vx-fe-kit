import type { SortDescriptor } from '@vezham/react-v3'

import { sportsData } from '../../../store/useOperations/useSports'
import type { SportItem } from '../../../store/useOperations/useSports'
import type { OperationColumn, OperationPageConfig } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'coach',
    label: 'Coach',
    type: 'person',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'startedYear',
    label: 'Started Year',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]
const rows: SportItem[] = sportsData

export const sportsConfig = makeConfig({
  key: 'sports',
  title: 'Sports',
  pageTitle: 'Sports',
  listTitle: 'Sports',
  addLabel: 'Add Sport',
  ariaLabel: 'Sports',
  breadcrumb: ['Dashboard', 'Management', 'Sports'],
  columns,
  rows,
  filters: [
    {
      key: 'name',
      label: 'Name',
      values: rows.map(row => row.name)
    },
    {
      key: 'coach',
      label: 'Coach',
      values: rows.map(row => row.coach?.name)
    },
    {
      key: 'morefilters',
      label: 'More Filters',
      values: ['Name', 'Coach', 'Started Year', 'Action']
    }
  ],
  initialColumn: 'name',
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
