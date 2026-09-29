import { AppIcon } from '@vx/react/app-icon'

import type { SortableHeaderProps } from '@pages/academic/homework/types'
import { classNames } from '@pages/academic/homework/variants'

export function SortableHeader({
  children,
  sortDirection
}: SortableHeaderProps) {
  const icon =
    sortDirection === 'ascending'
      ? 'vx:chevron-up'
      : sortDirection === 'descending'
        ? 'vx:chevron-down'
        : 'vx:chevrons-up-down'

  return (
    <span className={classNames.sortableHeader}>
      {children}
      <AppIcon icon={icon} size={14} aria-hidden="true" />
    </span>
  )
}
