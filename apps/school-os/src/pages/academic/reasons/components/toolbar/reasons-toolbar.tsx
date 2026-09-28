import { SearchField, type SortDescriptor, Surface } from '@vezham/react-v3'

import { ColumnsDropdown } from '../../../shared/columns-dropdown'
import { reasonsColumnOptions } from '../../data'
import type {
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft
} from '../../types'
import { classNames } from '../../variants'
import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import { SortDropdown } from './sort-dropdown'

type ReasonsToolbarProps = {
  activeDateLabel: string
  activeSortLabel: string
  datePreset: DatePresetKey
  draftFilters: FilterDraft
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  searchQuery: string
  visibleColumns: Set<string>
  setDraftFilters: (filters: FilterDraft) => void
  sortField: SortDescriptor['column']
  sortDirection: SortDescriptor['direction']
  onVisibleColumnsChange: (columns: Set<string>) => void
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onSearchChange: (value: string) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
}

export function ReasonsToolbar({
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
}: ReasonsToolbarProps) {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Academic</p>
          <h1 className={classNames.title}>Academic Reasons</h1>
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
            columns={reasonsColumnOptions}
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
      <div className={classNames.headerRow}>
        <SearchField
          aria-label="Search schedules"
          value={searchQuery}
          onChange={onSearchChange}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>
    </Surface>
  )
}
