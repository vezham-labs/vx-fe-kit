import type { SortDescriptor } from '@vezham/react-v3'

import { playersData } from '../../../store/useOperations/usePlayers'
import type { PlayerItem } from '../../../store/useOperations/usePlayers'
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
    key: 'playername',
    label: 'Player Name',
    type: 'person',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'sports',
    label: 'Sports',
    type: 'text',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'dateofjoin',
    label: 'Date of Join ',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]
const rows: PlayerItem[] = playersData

export const playersConfig = makeConfig({
  key: 'players',
  title: 'Players',
  pageTitle: 'Players',
  listTitle: 'Players',
  addLabel: 'Add Players',
  ariaLabel: 'Players',
  breadcrumb: ['Dashboard', 'Management', 'Players'],
  columns,
  rows,
  filters: [
    {
      key: 'playername',
      label: 'Player',
      values: rows.map(row => row.playername?.name)
    },
    {
      key: 'sports',
      label: 'Sports',
      values: rows.map(row => row.sports)
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
