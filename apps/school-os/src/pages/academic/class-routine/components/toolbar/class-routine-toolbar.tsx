import { type SortDescriptor, Surface } from '@vezham/react-v3'

import type {
  ClassRoutineColumnKey,
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft
} from '@pages/academic/class-routine/types'
import { classNames } from '@pages/academic/class-routine/variants'
import {
  AcademicToolbarHeader,
  AcademicToolbarSearch
} from '@pages/academic/shared/toolbar-layout'

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
  visibleColumns: Set<ClassRoutineColumnKey>
  setDraftFilters: (filters: FilterDraft) => void
  sortField: SortDescriptor['column']
  sortDirection: SortDescriptor['direction']
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onSearchChange: (value: string) => void
  onVisibleColumnsChange: (columns: Set<ClassRoutineColumnKey>) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
}

export const ClassRoutineToolbar = ({
  activeDateLabel,
  activeSortLabel,
  datePreset,
  draftFilters,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  searchQuery,
  visibleColumns,
  setDraftFilters,
  sortField,
  sortDirection,
  onApplyFilters,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange,
  onResetFilters,
  onSearchChange,
  onVisibleColumnsChange,
  onSortFieldChange,
  onSortDirectionChange
}: Props) => {
  return (
    <Surface className={classNames.toolbar}>
      <AcademicToolbarHeader
        actionsClassName={classNames.toolbarActions}
        eyebrow="Academic"
        headerClassName={classNames.headerRow}
        mutedTextClassName={classNames.mutedText}
        title="Class Routine"
        titleClassName={classNames.title}
        actions={
          <>
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
              sortField={sortField}
              sortDirection={sortDirection}
              onSortFieldChange={onSortFieldChange}
              onSortDirectionChange={onSortDirectionChange}
            />
          </>
        }
      />
      <AcademicToolbarSearch
        ariaLabel="Search schedules"
        className={classNames.headerRow}
        value={searchQuery}
        alignEnd
        onChange={onSearchChange}
      />
    </Surface>
  )
}
