import { AppIcon } from '@components/app-icon'
import type { SortableHeaderProps } from '@pages/academic/examinations/exam-attendance/types'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'

export function SortableHeader({
  children,
  sortDirection
}: SortableHeaderProps) {
  const icon =
    sortDirection === 'ascending'
      ? 'lucide:chevron-up'
      : sortDirection === 'descending'
        ? 'lucide:chevron-down'
        : 'lucide:chevrons-up-down'

  return (
    <span className={classNames.sortableHeader}>
      {children}
      <AppIcon icon={icon} size={14} aria-hidden="true" />
    </span>
  )
}
