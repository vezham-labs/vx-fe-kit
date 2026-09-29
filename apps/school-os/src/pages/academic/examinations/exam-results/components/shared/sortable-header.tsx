import {
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon
} from '@vezham/icons-react'

import type { SortableHeaderProps } from '@pages/academic/examinations/exam-results/types'
import { classNames } from '@pages/academic/examinations/exam-results/variants'

export const SortableHeader = ({
  children,
  sortDirection
}: SortableHeaderProps) => {
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
