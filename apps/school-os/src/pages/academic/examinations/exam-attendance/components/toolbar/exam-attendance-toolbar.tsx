import { type SortDescriptor, Surface } from '@vezham/react-v3'

import { attendanceColumnOptions } from '@pages/academic/examinations/exam-attendance/data'
import type {
  AttendanceColumnKey,
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft
} from '@pages/academic/examinations/exam-attendance/types'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'
import { ColumnsDropdown } from '@pages/academic/shared/columns-dropdown'
import { AcademicToolbarSearch } from '@pages/academic/shared/toolbar-layout'

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
  visibleColumns: Set<AttendanceColumnKey>
  setDraftFilters: (filters: FilterDraft) => void
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onSearchChange: (value: string) => void
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onVisibleColumnsChange: (columns: Set<AttendanceColumnKey>) => void
}

export const ExamAttendanceToolbar = ({
  activeDateLabel,
  activeSortLabel,
  datePreset,
  draftFilters,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  searchQuery,
  visibleColumns,
  setDraftFilters,
  onApplyFilters,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange,
  onResetFilters,
  onSearchChange,
  sortDirection,
  sortField,
  onSortDirectionChange,
  onSortFieldChange,
  onVisibleColumnsChange
}: Props) => {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Academic</p>
          <h1 className={classNames.title}>Exam Attendance</h1>
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
            ariaLabel="Show or hide attendance columns"
            options={attendanceColumnOptions}
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
        ariaLabel="Search attendance"
        className={classNames.headerRow}
        value={searchQuery}
        alignEnd
        onChange={onSearchChange}
      />
    </Surface>
  )
}
