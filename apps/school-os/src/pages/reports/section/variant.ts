export const classNames = {
  page: 'space-y-4',
  toolbar: 'flex flex-col gap-4 p-4',
  mutedText: 'text-muted text-sm',
  headerRow:
    'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between',
  title: 'text-base font-semibold',
  toolbarActions:
    'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end',
  datePopover: 'w-[360px] p-2',
  customDatePanel: 'space-y-3',
  dateOptionLabel: 'flex w-full items-center justify-between',
  fullWidth: 'w-full',
  rowsControls: 'flex items-center gap-2',
  controlsRight:
    'flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end',
  legend: 'flex flex-wrap items-center gap-1.5',
  tableContent: 'text-[#4d5a76]',
  paginationFooter: '',
  personCell: 'flex min-w-0 items-center gap-2',
  personAvatar: 'h-8 w-8 shrink-0',
  personName: 'truncate',
  sortableHeader: 'flex items-center gap-1',
  emptyState:
    'flex min-h-[220px] w-full flex-col items-center justify-center gap-4 py-12 text-center',
  emptyIcon: 'text-muted',
  emptyText: 'text-muted text-lg font-medium',
  filterPanel: 'flex w-80 flex-col gap-4 p-4',
  filterTitle: 'text-lg font-semibold',
  filterActions: 'flex justify-end gap-2',
  marker: 'mx-auto h-4 w-1.5 rounded-full',
  percentBadge:
    'inline-flex min-w-8 items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-semibold text-white',
  link: 'text-primary font-medium'
} as const
