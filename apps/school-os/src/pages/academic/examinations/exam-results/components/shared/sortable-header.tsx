import {
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon
} from '@vezham/icons-react'

import type { SortableHeaderProps } from '../../types'
import { classNames } from '../../variants'

export function SortableHeader({
  children,
  sortDirection
}: SortableHeaderProps) {
  return (
    <span className={classNames.sortableHeader}>
      {children}
      {sortDirection === 'ascending' && (
        <ArrowUpIcon size={14} aria-hidden="true" />
      )}
      {sortDirection === 'descending' && (
        <ArrowDownIcon size={14} aria-hidden="true" />
      )}
    </span>
  )
}
