import { type SortDescriptor, Surface } from '@vezham/react-v3'

import type {
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft,
  SectionColumnKey
} from '@pages/academic/section/types'
import { classNames } from '@pages/academic/section/variants'
import { AcademicToolbarSearch } from '@pages/academic/shared/toolbar-layout'

import { ColumnsDropdown } from './columns-dropdown'
import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import { SortDropdown } from './sort-dropdown'

type Props = {
  activeDateLabel: string
  activeSortLabel: string
  datePreset: DatePresetKey
  draftFilters: FilterDraft
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  searchQuery: string
  visibleColumns: Set<SectionColumnKey>
  setDraftFilters: (filters: FilterDraft) => void
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onSearchChange: (value: string) => void
  onVisibleColumnsChange: (columns: Set<SectionColumnKey>) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
}

export const SectionToolbar = ({
  activeDateLabel,
  activeSortLabel,
  datePreset,
  draftFilters,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  searchQuery,
  visibleColumns,
  setDraftFilters,
  sortDirection,
  sortField,
  onApplyFilters,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange,
  onResetFilters,
  onSearchChange,
  onVisibleColumnsChange,
  onSortDirectionChange,
  onSortFieldChange
}: Props) => {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Academic</p>
          <h1 className={classNames.title}>Class Section</h1>
        </div>

        <div className={classNames.toolbarActions}>
          <DateRangeDropdown
            activeDateLabel={activeDateLabel}
            datePreset={datePreset}
            isCustomDateRangeOpen={isCustomDateRangeOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            onCustomDateRangeChange={onCustomDateRangeChange}
            onCustomDateRangeOpenChange={onCustomDateRangeOpenChange}
            onDateDropdownOpenChange={onDateDropdownOpenChange}
            onDatePresetChange={onDatePresetChange}
          />

          <FilterDropdown
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
            onApply={onApplyFilters}
            onReset={onResetFilters}
          />

          <ColumnsDropdown
            visibleColumns={visibleColumns}
            onVisibleColumnsChange={onVisibleColumnsChange}
          />

          <SortDropdown
            activeSortLabel={activeSortLabel}
            sortDirection={sortDirection}
            sortField={sortField}
            onSortDirectionChange={onSortDirectionChange}
            onSortFieldChange={onSortFieldChange}
          />
        </div>
      </div>
      <AcademicToolbarSearch
        ariaLabel="Search schedules"
        className={classNames.headerRow}
        value={searchQuery}
        onChange={onSearchChange}
      />
    </Surface>
  )
}
