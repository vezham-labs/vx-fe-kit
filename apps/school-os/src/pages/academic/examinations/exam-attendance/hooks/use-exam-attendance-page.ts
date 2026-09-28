import { useHotkey } from '@tanstack/react-hotkeys'
import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

import {
  attendanceColumnOptions,
  emptyForm,
  sortOptions,
  useExamAttendance
} from '../../../../../store/useAcademic/useExamAttendance'
import { sortRows } from '../../../shared/sort'
import type {
  AttendanceColumnKey,
  AttendanceFormErrors,
  AttendanceFormState,
  AttendanceRow,
  CustomDateRangeValue,
  DatePresetKey,
  DateRangeFilter,
  DrawerMode,
  DrawerQueryState,
  FilterDraft,
  OpenDrawerOptions,
  ToastState
} from '../types'
import { useDisclosure } from '../types'
import {
  formatDateRangeLabel,
  getPresetDateRange,
  isISODateInRange,
  toISODate
} from '../utils/date'
import {
  createNextAttendanceId,
  rowToForm,
  validateAttendanceForm
} from '../utils/exam-attendance'
import { hiddenTextareaStyles } from '../variants'

const moduleRoutePath = '/academic/examinations/exam-attendance'

const getModuleBasePath = (pathname: string) => {
  const routeIndex = pathname.indexOf(moduleRoutePath)

  if (routeIndex < 0) {
    return pathname.replace(/\/$/, '')
  }

  return pathname.slice(0, routeIndex + moduleRoutePath.length)
}

const getRowIdFromPath = (pathname: string) => {
  const basePath = getModuleBasePath(pathname)

  if (!pathname.startsWith(basePath + '/')) {
    return null
  }

  const [id] = pathname.slice(basePath.length + 1).split('/')

  return id ? decodeURIComponent(id) : null
}

const emptyFilters: FilterDraft = {
  name: null,
  english: null,
  maths: null,
  spanish: null,
  physics: null,
  chemistry: null,
  computer: null,
  envscience: null,
  examtype: null,
  classes: null,
  section: null,
  status: null
}

const getSortLabel = (column: SortDescriptor['column']) => {
  return (
    sortOptions.find(option => option.column === column)?.label ??
    attendanceColumnOptions.find(option => option.key === column)?.label ??
    'Sort'
  )
}

export function useExamAttendancePage() {
  const routeParams = useParams({ strict: false }) as { id?: string }
  const examAttendanceQuery = useExamAttendance.list({})
  const [data, setData] = useState<AttendanceRow[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('5')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('thisYear')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] =
    useState<DateRangeFilter | null>(null)
  const [sortField, setSortField] = useState<SortDescriptor['column']>('id')
  const [sortDirection, setSortDirection] =
    useState<SortDescriptor['direction']>('descending')
  const [activeSortLabel, setActiveSortLabel] = useState(() =>
    getSortLabel('id')
  )
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(filters)
  const [visibleColumns, setVisibleColumns] = useState<
    Set<AttendanceColumnKey>
  >(() => new Set(attendanceColumnOptions.map(column => column.key)))
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Selection>(new Set())
  const [mode, setMode] = useState<DrawerMode>('view')
  const [form, setForm] = useState<AttendanceFormState>(emptyForm)
  const [formErrors, setFormErrors] = useState<AttendanceFormErrors>({})
  const [toast, setToast] = useState<ToastState | null>(null)
  const drawer = useDisclosure()
  const wasDrawerOpenRef = useRef(drawer.isOpen)

  useEffect(() => {
    if (!examAttendanceQuery.data?.length || data.length) {
      return
    }

    setData(examAttendanceQuery.data)
  }, [data.length, examAttendanceQuery.data])

  const activeDateRange = useMemo(() => {
    if (datePreset === 'custom') {
      return customDateRange
    }

    return getPresetDateRange(datePreset)
  }, [customDateRange, datePreset])

  const sortDescriptor = useMemo<SortDescriptor>(
    () => ({
      column: sortField,
      direction: sortDirection
    }),
    [sortDirection, sortField]
  )

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return data.filter(row => {
      const matchesQuery =
        !query ||
        row.id.toLowerCase().includes(query) ||
        row.name.toLowerCase().includes(query) ||
        row.english.toLowerCase().includes(query) ||
        row.spanish.toLowerCase().includes(query) ||
        row.maths.toLowerCase().includes(query) ||
        row.physics.toLowerCase().includes(query) ||
        row.chemistry.toLowerCase().includes(query) ||
        row.computer.toLowerCase().includes(query) ||
        row.envscience.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query) ||
        row.examtype?.toLowerCase().includes(query) ||
        row.classes?.toLowerCase().includes(query) ||
        row.section?.toLowerCase().includes(query)
      const matchesDate =
        !activeDateRange ||
        isISODateInRange(
          row.createdAt,
          activeDateRange.start,
          activeDateRange.end
        )

      return (
        matchesQuery &&
        matchesDate &&
        (!filters.name || row.name === filters.name) &&
        (!filters.english || row.english === filters.english) &&
        (!filters.spanish || row.spanish === filters.spanish) &&
        (!filters.maths || row.maths === filters.maths) &&
        (!filters.envscience || row.envscience === filters.envscience) &&
        (!filters.physics || row.physics === filters.physics) &&
        (!filters.chemistry || row.chemistry === filters.chemistry) &&
        (!filters.computer || row.computer === filters.computer) &&
        (!filters.examtype || row.examtype === filters.examtype) &&
        (!filters.classes || row.classes === filters.classes) &&
        (!filters.section || row.section === filters.section) &&
        (!filters.status || row.status === filters.status)
      )
    })
  }, [activeDateRange, data, filters, searchQuery])

  const sortedRows = useMemo(() => {
    return sortRows(filteredRows, sortDescriptor)
  }, [filteredRows, sortDescriptor])

  const pageSize = Number(rowsPerPage)
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const selectedRow = useMemo(
    () => data.find(row => row.id === activeRowId) ?? null,
    [activeRowId, data]
  )
  const selectedRows = useMemo(() => {
    if (selectedRowKeys === 'all') {
      return data
    }

    return data.filter(row => selectedRowKeys.has(row.id))
  }, [data, selectedRowKeys])
  const selectedRowIndex = activeRowId
    ? sortedRows.findIndex(row => row.id === activeRowId)
    : -1
  const tableSelectedKeys = useMemo(
    () => (activeRowId ? new Set([activeRowId]) : selectedRowKeys),
    [activeRowId, selectedRowKeys]
  )
  const selectedCount = selectedRows.length

  const activeDateLabel =
    datePreset === 'custom'
      ? customDateRange
        ? formatDateRangeLabel(customDateRange)
        : 'Custom Range'
      : formatDateRangeLabel(getPresetDateRange(datePreset))

  const showToast = useCallback(
    (message: string, status: ToastState['status'] = 'success') => {
      setToast({ message, status })
    },
    []
  )

  const copyText = useCallback(async (value: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value)
      return
    }

    const textarea = document.createElement('textarea')

    textarea.value = value
    textarea.setAttribute('readonly', '')
    Object.assign(textarea.style, hiddenTextareaStyles)
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }, [])

  const updateDrawerQuery = useCallback(
    (nextState: DrawerQueryState | null, replace = false) => {
      const url = new URL(window.location.href)
      const basePath = getModuleBasePath(url.pathname)

      if (nextState) {
        url.pathname =
          nextState.mode === 'create' || !nextState.id
            ? basePath
            : basePath + '/' + encodeURIComponent(nextState.id)
        url.searchParams.delete('id')
        url.searchParams.set('mode', nextState.mode)
      } else {
        url.pathname = basePath
        url.searchParams.delete('id')
        url.searchParams.delete('mode')
      }

      window.history[replace ? 'replaceState' : 'pushState'](
        null,
        '',
        `${url.pathname}${url.search}${url.hash}`
      )
    },
    []
  )

  const openDrawer = useCallback(
    (
      nextMode: DrawerMode,
      row: AttendanceRow | null,
      options: OpenDrawerOptions = {}
    ) => {
      setMode(nextMode)
      setActiveRowId(row?.id ?? null)
      setForm(row ? rowToForm(row) : emptyForm)
      setFormErrors({})
      drawer.onOpen()

      if (options.syncUrl !== false) {
        updateDrawerQuery(
          nextMode === 'create'
            ? { mode: nextMode }
            : row
              ? { id: row.id, mode: nextMode }
              : null,
          options.replaceUrl
        )
      }
    },
    [drawer, updateDrawerQuery]
  )

  const updateTableSelection = useCallback((keys: Selection) => {
    setSelectedRowKeys(keys)
  }, [])

  const updateVisibleColumns = useCallback(
    (columns: Set<AttendanceColumnKey>) => {
      setVisibleColumns(new Set(columns))
    },
    []
  )

  const clearSelection = useCallback(() => {
    setSelectedRowKeys(new Set())
  }, [])

  const closeDrawer = useCallback(() => {
    setFormErrors({})
    drawer.onClose()
    setActiveRowId(null)
    updateDrawerQuery(null)
  }, [drawer, updateDrawerQuery])

  const toggleDrawer = useCallback(() => {
    if (drawer.isOpen) {
      closeDrawer()
      return
    }

    const selectedKey = Array.from(selectedRowKeys)[0]
    const selectedRow =
      sortedRows.find(row => row.id === selectedKey) ?? sortedRows[0]

    if (selectedRow) {
      openDrawer('view', selectedRow, { replaceUrl: true })
      return
    }

    openDrawer('create', null)
  }, [closeDrawer, drawer.isOpen, openDrawer, selectedRowKeys, sortedRows])

  const setDrawerMode = useCallback(
    (nextMode: Exclude<DrawerMode, 'create'>) => {
      setMode(nextMode)

      if (selectedRow) {
        updateDrawerQuery({ id: selectedRow.id, mode: nextMode })
      }
    },
    [selectedRow, updateDrawerQuery]
  )

  const goToRowAt = useCallback(
    (index: number) => {
      const nextRow = sortedRows[index]

      if (!nextRow) {
        return
      }

      setActiveRowId(nextRow.id)
      setForm(rowToForm(nextRow))
      setMode(currentMode => (currentMode === 'create' ? 'view' : currentMode))
      updateDrawerQuery({
        id: nextRow.id,
        mode: mode === 'edit' ? 'edit' : 'view'
      })
    },
    [mode, sortedRows, updateDrawerQuery]
  )

  const goToNextRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.min(sortedRows.length - 1, selectedRowIndex + 1))
  }, [goToRowAt, selectedRowIndex, sortedRows.length])

  const goToPreviousRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.max(0, selectedRowIndex - 1))
  }, [goToRowAt, selectedRowIndex])

  const getAttendanceUrl = useCallback(
    (row: AttendanceRow, nextMode: Exclude<DrawerMode, 'create'> = 'view') => {
      const url = new URL(window.location.href)
      const basePath = getModuleBasePath(url.pathname)

      url.searchParams.set('mode', nextMode)
      url.searchParams.delete('id')
      url.pathname = `${basePath}/${encodeURIComponent(row.id)}`
      url.hash = ''

      return url.toString()
    },
    []
  )

  const copySelectedIds = useCallback(() => {
    if (!selectedRows.length) {
      return
    }

    void copyText(selectedRows.map(row => row.id).join('\n'))
      .then(() => {
        showToast(
          selectedRows.length === 1
            ? 'ID copied'
            : `${selectedRows.length} IDs copied`
        )
      })
      .catch(() => {
        showToast('Unable to copy IDs', 'danger')
      })
  }, [copyText, selectedRows, showToast])

  const copySelectedLinks = useCallback(() => {
    if (!selectedRows.length) {
      return
    }

    void copyText(
      selectedRows
        .map(row => getAttendanceUrl(row, mode === 'edit' ? 'edit' : 'view'))
        .join('\n')
    )
      .then(() => {
        showToast(
          selectedRows.length === 1
            ? 'URL copied'
            : `${selectedRows.length} URLs copied`
        )
      })
      .catch(() => {
        showToast('Unable to copy URLs', 'danger')
      })
  }, [copyText, getAttendanceUrl, mode, selectedRows, showToast])

  const editSelectedRows = useCallback(() => {
    if (selectedRows.length !== 1) {
      return
    }

    openDrawer('edit', selectedRows[0])
  }, [openDrawer, selectedRows])

  const deleteSelectedRows = useCallback(() => {
    if (!selectedRows.length) {
      return
    }

    const selectedIds = new Set(selectedRows.map(row => row.id))

    setData(current => current.filter(row => !selectedIds.has(row.id)))
    setSelectedRowKeys(new Set())

    if (activeRowId && selectedIds.has(activeRowId)) {
      closeDrawer()
    }

    showToast(
      selectedRows.length === 1
        ? 'Item deleted'
        : `${selectedRows.length} items deleted`
    )
  }, [activeRowId, closeDrawer, selectedRows, showToast])

  useEffect(() => {
    const openAddAttendance = () => openDrawer('create', null)

    window.addEventListener(
      'academic:exam-attendance:create',
      openAddAttendance
    )
    return () =>
      window.removeEventListener(
        'academic:exam-attendance:create',
        openAddAttendance
      )
  }, [openDrawer])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  useEffect(() => {
    const syncDrawerFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const id = getRowIdFromPath(window.location.pathname) ?? routeParams.id
      const urlMode = params.get('mode')

      if (urlMode === 'create') {
        setMode('create')
        setActiveRowId(null)
        setForm(emptyForm)
        setFormErrors({})
        drawer.onOpen()
        return
      }

      if (!id || (urlMode !== 'view' && urlMode !== 'edit')) {
        setActiveRowId(null)
        drawer.onClose()
        return
      }

      const row = data.find(item => item.id === id)

      if (!row) {
        setActiveRowId(null)
        drawer.onClose()
        return
      }

      setMode(urlMode)
      setActiveRowId(row.id)
      setForm(rowToForm(row))
      setFormErrors({})
      drawer.onOpen()
    }

    syncDrawerFromUrl()
    window.addEventListener('popstate', syncDrawerFromUrl)

    return () => window.removeEventListener('popstate', syncDrawerFromUrl)
  }, [data, routeParams.id])

  useEffect(() => {
    if (wasDrawerOpenRef.current && !drawer.isOpen) {
      setSelectedRowKeys(new Set())
    }

    wasDrawerOpenRef.current = drawer.isOpen
  }, [drawer.isOpen])

  useEffect(() => {
    if (drawer.isOpen || !activeRowId) {
      return
    }

    setActiveRowId(null)
  }, [activeRowId, drawer.isOpen])

  useEffect(() => {
    if (!activeRowId) {
      return
    }

    const rowIndex = sortedRows.findIndex(row => row.id === activeRowId)

    if (rowIndex < 0) {
      return
    }

    const nextPage = Math.floor(rowIndex / pageSize) + 1

    if (nextPage !== currentPage) {
      setPage(nextPage)
      return
    }

    window.requestAnimationFrame(() => {
      document
        .querySelector(`[data-attendance-row-id="${activeRowId}"]`)
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })
  }, [activeRowId, currentPage, pageSize, sortedRows])

  useHotkey('Meta+/', () => toggleDrawer())

  useHotkey('Meta+ArrowUp', () => goToNextRow(), {
    enabled: drawer.isOpen && mode !== 'create'
  })

  useHotkey('Meta+ArrowDown', () => goToPreviousRow(), {
    enabled: drawer.isOpen && mode !== 'create'
  })

  const updateDatePreset = (key: DatePresetKey) => {
    setDatePreset(key)
    setPage(1)

    if (key === 'custom') {
      setIsCustomDateRangeOpen(true)
      setIsDateDropdownOpen(true)
      window.setTimeout(() => {
        setIsCustomDateRangeOpen(true)
        setIsDateDropdownOpen(true)
      }, 0)
      return
    }

    setIsCustomDateRangeOpen(false)
    setIsDateDropdownOpen(false)
  }

  const updateCustomDateRange = (value: CustomDateRangeValue | null) => {
    setDatePreset('custom')
    setPage(1)

    if (!value?.start || !value?.end) {
      setCustomDateRange(null)
      return
    }

    setCustomDateRange({
      start: String(value.start),
      end: String(value.end)
    })
    setIsDateDropdownOpen(false)
    setIsCustomDateRangeOpen(false)
  }

  const updateSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const updateRowsPerPage = (value: string | number | null) => {
    setRowsPerPage(value ? String(value) : '10')
    setPage(1)
  }

  const applyFilters = () => {
    setFilters(draftFilters)
    setPage(1)
  }

  const resetFilters = () => {
    setDraftFilters(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
  }

  const updateSortField = (column: SortDescriptor['column']) => {
    setSortField(column)
    setActiveSortLabel(getSortLabel(column))
    setPage(1)
  }

  const updateSortDirection = (direction: SortDescriptor['direction']) => {
    setSortDirection(direction)
    setPage(1)
  }

  const updateSortDescriptor = (descriptor: SortDescriptor) => {
    setSortField(descriptor.column)
    setSortDirection(descriptor.direction)
    setActiveSortLabel(getSortLabel(descriptor.column))
    setPage(1)
  }

  const updateForm = (field: keyof AttendanceFormState, value: string) => {
    setForm(current => ({ ...current, [field]: value }) as AttendanceFormState)
    setFormErrors(current => ({ ...current, [field]: undefined }))
  }

  const saveAttendance = () => {
    const name = form.name.trim()
    const errors = validateAttendanceForm(form)

    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    if (mode === 'create') {
      const newRow: AttendanceRow = {
        id: createNextAttendanceId(data),
        name,
        english: form.english,
        spanish: form.spanish,
        maths: form.maths,
        chemistry: form.chemistry,
        physics: form.physics,
        computer: form.computer,
        envscience: form.envscience,
        status: form.status,
        createdAt: toISODate(new Date()),
        viewedAt: toISODate(new Date())
      }

      setData(current => [newRow, ...current])
      setForm(emptyForm)
      setActiveRowId(null)
      setMode('view')
      setPage(1)
      closeDrawer()
      return
    }

    if (!selectedRow) {
      return
    }

    const updatedRow: AttendanceRow = {
      ...selectedRow,
      name,
      english: form.english,
      spanish: form.spanish,
      maths: form.maths,
      computer: form.computer,
      envscience: form.envscience,
      chemistry: form.chemistry,
      physics: form.physics,
      status: form.status
    }

    setData(current =>
      current.map(row => (row.id === updatedRow.id ? updatedRow : row))
    )
    setActiveRowId(updatedRow.id)
    setForm(rowToForm(updatedRow))
    setMode('view')
    updateDrawerQuery({ id: updatedRow.id, mode: 'view' })
  }

  const deleteAttendance = (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))
    setSelectedRowKeys(current => {
      if (current === 'all') {
        return new Set()
      }

      if (!current.size) {
        return current
      }

      const next = new Set(current)

      next.delete(rowId)

      return next
    })

    if (activeRowId === rowId) {
      setActiveRowId(null)
      drawer.onClose()
      updateDrawerQuery(null)
    }

    showToast('Item deleted')
  }

  const copyAttendanceLink = (row: AttendanceRow) => {
    const attendanceUrl = getAttendanceUrl(
      row,
      mode === 'edit' ? 'edit' : 'view'
    )

    void copyText(attendanceUrl)
      .then(() => {
        showToast('URL copied')
      })
      .catch(() => {
        showToast('Unable to copy URL', 'danger')
      })
  }

  const copyAttendanceId = (row: AttendanceRow) => {
    void copyText(row.id)
      .then(() => {
        showToast('ID copied')
      })
      .catch(() => {
        showToast('Unable to copy ID', 'danger')
      })
  }

  const openAttendancePage = (row: AttendanceRow) => {
    window.open(getAttendanceUrl(row), '_blank', 'noopener,noreferrer')
  }

  return {
    toast,
    onToastClose: () => setToast(null),
    toolbar: {
      activeDateLabel,
      activeSortLabel,
      datePreset,
      draftFilters,
      isCustomDateRangeOpen,
      isDateDropdownOpen,
      searchQuery,
      visibleColumns,
      setDraftFilters,
      onApplyFilters: applyFilters,
      onCustomDateRangeChange: updateCustomDateRange,
      onCustomDateRangeOpenChange: setIsCustomDateRangeOpen,
      onDateDropdownOpenChange: setIsDateDropdownOpen,
      onDatePresetChange: updateDatePreset,
      onResetFilters: resetFilters,
      onSearchChange: updateSearch,
      onVisibleColumnsChange: updateVisibleColumns,
      sortDirection,
      sortField,
      onSortDirectionChange: updateSortDirection,
      onSortFieldChange: updateSortField
    },
    table: {
      activeRowId,
      currentPage,
      pageSize,
      rows: paginatedRows,
      selectedCount,
      selectedKeys: tableSelectedKeys,
      rowsPerPage,
      visibleColumns,
      sortDescriptor,
      totalPages,
      totalRows: sortedRows.length,
      onBulkEdit: editSelectedRows,
      onBulkCopyIds: copySelectedIds,
      onBulkCopyLinks: copySelectedLinks,
      onBulkDelete: deleteSelectedRows,
      onClearSelection: clearSelection,
      onDelete: deleteAttendance,
      onOpenDrawer: openDrawer,
      onPageChange: setPage,
      onRowsPerPageChange: updateRowsPerPage,
      onSelectionChange: updateTableSelection,
      onSortChange: updateSortDescriptor
    },
    drawerProps: {
      canGoNext:
        selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1,
      canGoPrevious: selectedRowIndex > 0,
      drawerState: drawer,
      form,
      formErrors,
      mode,
      row: selectedRow,
      onCancel: closeDrawer,
      onClose: closeDrawer,
      onCopyId: copyAttendanceId,
      onCopyLink: copyAttendanceLink,
      onEdit: () => setDrawerMode('edit'),
      onFormChange: updateForm,
      onGoNext: goToNextRow,
      onGoPrevious: goToPreviousRow,
      onOpenPage: openAttendancePage,
      onSave: saveAttendance
    }
  }
}
