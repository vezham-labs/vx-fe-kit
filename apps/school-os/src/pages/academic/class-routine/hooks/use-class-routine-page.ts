import { useHotkey } from '@tanstack/react-hotkeys'
import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

import { useClassRoutine } from '../../../../store/useAcademic/useClassRoutine'
import {
  classRoutineColumnOptions,
  emptyForm,
  sortOptions
} from '../../../../store/useAcademic/useClassRoutine'
import type {
  ClassFormErrors,
  ClassFormState,
  ClassRoutineColumnKey,
  ClassRow,
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
  createNextClassId,
  rowToForm,
  validateClassForm
} from '../utils/class-routine'
import {
  formatDateRangeLabel,
  getPresetDateRange,
  isISODateInRange,
  toISODate
} from '../utils/date'
import { hiddenTextareaStyles } from '../variants'

const classRoutineRoutePath = '/academic/class-routine'

const getClassRoutineBasePath = (pathname: string) => {
  const routeIndex = pathname.indexOf(classRoutineRoutePath)

  if (routeIndex < 0) {
    return pathname.replace(/\/$/, '')
  }

  return pathname.slice(0, routeIndex + classRoutineRoutePath.length)
}

const getRowIdFromPath = (pathname: string) => {
  const basePath = getClassRoutineBasePath(pathname)

  if (!pathname.startsWith(`${basePath}/`)) {
    return null
  }

  const [id] = pathname.slice(basePath.length + 1).split('/')

  return id ? decodeURIComponent(id) : null
}

const emptyFilters: FilterDraft = {
  classes: null,
  section: null,
  teacher: null,
  subject: null,
  starttime: null,
  endtime: null,
  day: null,
  classroom: null,
  status: null
}

const getSortLabel = (column: SortDescriptor['column']) => {
  return (
    sortOptions.find(option => option.column === column)?.label ??
    classRoutineColumnOptions.find(option => option.key === column)?.label ??
    'Sort'
  )
}

export function useClassRoutinePage() {
  const routeParams = useParams({ strict: false }) as { id?: string }
  const classRoutineQuery = useClassRoutine.list({})
  const [data, setData] = useState<ClassRow[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('5')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('thisYear')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] =
    useState<DateRangeFilter | null>(null)
  const [sortField, setSortField] =
    useState<SortDescriptor['column']>('viewedAt')
  const [sortDirection, setSortDirection] =
    useState<SortDescriptor['direction']>('descending')
  const [activeSortLabel, setActiveSortLabel] = useState(() =>
    getSortLabel('viewedAt')
  )
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(filters)
  const [visibleColumns, setVisibleColumns] = useState<
    Set<ClassRoutineColumnKey>
  >(() => new Set(classRoutineColumnOptions.map(column => column.key)))
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Selection>(new Set())
  const [mode, setMode] = useState<DrawerMode>('view')
  const [form, setForm] = useState<ClassFormState>(emptyForm)
  const [formErrors, setFormErrors] = useState<ClassFormErrors>({})
  const [toast, setToast] = useState<ToastState | null>(null)
  const drawer = useDisclosure()
  const drawerWasOpenRef = useRef(drawer.isOpen)

  useEffect(() => {
    if (!classRoutineQuery.data?.length || data.length) {
      return
    }

    setData(classRoutineQuery.data)
  }, [classRoutineQuery.data, data.length])

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
        row.classes.toLowerCase().includes(query) ||
        row.section.toLowerCase().includes(query) ||
        row.teacher.toLowerCase().includes(query) ||
        row.subject.toLowerCase().includes(query) ||
        row.starttime.toLowerCase().includes(query) ||
        row.endtime.toLowerCase().includes(query) ||
        row.day.toLowerCase().includes(query) ||
        row.classroom.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query)
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
        (!filters.classes || row.classes === filters.classes) &&
        (!filters.section || row.section === filters.section) &&
        (!filters.subject || row.subject === filters.subject) &&
        (!filters.teacher || row.teacher === filters.teacher) &&
        (!filters.day || row.day === filters.day) &&
        (!filters.starttime || row.starttime === filters.starttime) &&
        (!filters.endtime || row.endtime === filters.endtime) &&
        (!filters.classroom || row.classroom === filters.classroom) &&
        (!filters.status || row.status === filters.status)
      )
    })
  }, [activeDateRange, data, filters, searchQuery])

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((firstRow, secondRow) => {
      const first = firstRow[sortDescriptor.column as keyof ClassRow]
      const second = secondRow[sortDescriptor.column as keyof ClassRow]
      const comparison =
        typeof first === 'number' && typeof second === 'number'
          ? first - second
          : String(first).localeCompare(String(second), undefined, {
              numeric: true
            })

      return sortDescriptor.direction === 'descending'
        ? comparison * -1
        : comparison
    })
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
      const basePath = getClassRoutineBasePath(url.pathname)

      if (nextState) {
        url.pathname =
          nextState.mode === 'create' || !nextState.id
            ? basePath
            : `${basePath}/${encodeURIComponent(nextState.id)}`
        url.searchParams.delete('id')
        url.searchParams.set('mode', nextState.mode)
      } else {
        url.pathname = basePath
        url.searchParams.delete('mode')
        url.searchParams.delete('id')
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
      row: ClassRow | null,
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

  const updateTableSelection = useCallback(
    (keys: Selection) => {
      setSelectedRowKeys(
        keys === 'all' ? new Set(paginatedRows.map(row => row.id)) : keys
      )
    },
    [paginatedRows]
  )

  const closeDrawer = useCallback(() => {
    setFormErrors({})
    setSelectedRowKeys(new Set())
    setActiveRowId(null)
    drawer.onClose()
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

      const nextPage = Math.floor(index / pageSize) + 1

      if (nextPage !== currentPage) {
        setPage(nextPage)
      }

      setActiveRowId(nextRow.id)
      setForm(rowToForm(nextRow))
      setMode(currentMode => (currentMode === 'create' ? 'view' : currentMode))
      updateDrawerQuery({
        id: nextRow.id,
        mode: mode === 'edit' ? 'edit' : 'view'
      })
    },
    [currentPage, mode, pageSize, sortedRows, updateDrawerQuery]
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

  useEffect(() => {
    const openAddSchedule = () => openDrawer('create', null)

    window.addEventListener('academic:classroutine:create', openAddSchedule)
    return () =>
      window.removeEventListener(
        'academic:classroutine:create',
        openAddSchedule
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
        setSelectedRowKeys(new Set())
        drawer.onClose()
        return
      }

      const row = data.find(item => item.id === id)

      if (!row) {
        setActiveRowId(null)
        setSelectedRowKeys(new Set())
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
    if (drawerWasOpenRef.current && !drawer.isOpen) {
      setSelectedRowKeys(new Set())
      setActiveRowId(null)
    }

    drawerWasOpenRef.current = drawer.isOpen
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
        .querySelector(`[data-class-row-id="${activeRowId}"]`)
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

  const updateDateDropdownOpen = (open: boolean) => {
    setIsDateDropdownOpen(open)
    if (!open) {
      setIsCustomDateRangeOpen(false)
    }
  }

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

  const updateVisibleColumns = useCallback(
    (columns: Set<ClassRoutineColumnKey>) => {
      setVisibleColumns(new Set(columns))
    },
    []
  )

  const clearSelection = useCallback(() => {
    setSelectedRowKeys(new Set())
  }, [])

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
        .map(row => getClassUrl(row, mode === 'edit' ? 'edit' : 'view'))
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
  }, [copyText, mode, selectedRows, showToast])

  const editSelectedClass = useCallback(() => {
    if (selectedRows.length !== 1) {
      return
    }

    openDrawer('edit', selectedRows[0])
  }, [openDrawer, selectedRows])

  const deleteSelectedClasses = useCallback(() => {
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

  const updateSortChange = (descriptor: SortDescriptor) => {
    setSortField(descriptor.column)
    setSortDirection(descriptor.direction)
    setActiveSortLabel(getSortLabel(descriptor.column))
    setPage(1)
  }

  const updateForm = (field: keyof ClassFormState, value: string) => {
    setForm(current => ({ ...current, [field]: value }))
    setFormErrors(current => ({ ...current, [field]: undefined }))
  }

  const saveClass = () => {
    const classes = form.classes.trim()
    const section = form.section.trim()
    const teacher = form.teacher.trim()
    const subject = form.subject.trim()
    const day = form.day.trim()
    const classroom = form.classroom.trim()
    const starttime = form.starttime
    const endtime = form.endtime

    const errors = validateClassForm(form)

    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    if (mode === 'create') {
      const newRow: ClassRow = {
        id: createNextClassId(data),
        classes,
        section,
        subject,
        teacher,
        day,
        classroom,
        starttime,
        endtime,
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

    const updatedRow: ClassRow = {
      ...selectedRow,
      classes,
      section,
      subject,
      teacher,
      day,
      classroom,
      starttime,
      endtime,
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

  const deleteClass = (rowId: string) => {
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

  const getClassUrl = (
    row: ClassRow,
    nextMode: Exclude<DrawerMode, 'create'> = 'view'
  ) => {
    const url = new URL(window.location.href)
    const basePath = getClassRoutineBasePath(url.pathname)

    url.searchParams.set('mode', nextMode)
    url.searchParams.delete('id')
    url.pathname = `${basePath}/${encodeURIComponent(row.id)}`
    url.hash = ''

    return url.toString()
  }

  const copyClassLink = (row: ClassRow) => {
    const classUrl = getClassUrl(row, mode === 'edit' ? 'edit' : 'view')

    void copyText(classUrl)
      .then(() => {
        showToast('URL copied')
      })
      .catch(() => {
        showToast('Unable to copy URL', 'danger')
      })
  }

  const copyClassId = (row: ClassRow) => {
    void copyText(row.id)
      .then(() => {
        showToast('ID copied')
      })
      .catch(() => {
        showToast('Unable to copy ID', 'danger')
      })
  }

  const openClassPage = (row: ClassRow) => {
    window.open(getClassUrl(row), '_blank', 'noopener,noreferrer')
  }

  return {
    drawer,
    toast,
    toolbar: {
      activeDateLabel,
      activeSortLabel,
      datePreset,
      draftFilters,
      isCustomDateRangeOpen,
      isDateDropdownOpen,
      rowsPerPage,
      searchQuery,
      visibleColumns,
      setDraftFilters,
      onApplyFilters: applyFilters,
      onCustomDateRangeChange: updateCustomDateRange,
      onCustomDateRangeOpenChange: setIsCustomDateRangeOpen,
      onDateDropdownOpenChange: updateDateDropdownOpen,
      onDatePresetChange: updateDatePreset,
      onResetFilters: resetFilters,
      onSearchChange: updateSearch,
      onVisibleColumnsChange: updateVisibleColumns,
      sortField,
      sortDirection,
      onSortFieldChange: updateSortField,
      onSortDirectionChange: updateSortDirection
    },
    table: {
      activeRowId,
      currentPage,
      pageSize,
      rows: paginatedRows,
      selectedCount: selectedRows.length,
      selectedKeys: tableSelectedKeys,
      rowsPerPage,
      visibleColumns,
      sortDescriptor,
      totalPages,
      totalRows: sortedRows.length,
      onBulkEdit: editSelectedClass,
      onDelete: deleteClass,
      onOpenDrawer: openDrawer,
      onPageChange: setPage,
      onClearSelection: clearSelection,
      onBulkCopyIds: copySelectedIds,
      onBulkCopyLinks: copySelectedLinks,
      onBulkDelete: deleteSelectedClasses,
      onSelectionChange: updateTableSelection,
      onRowsPerPageChange: updateRowsPerPage,
      onSortChange: updateSortChange
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
      onCopyId: copyClassId,
      onCopyLink: copyClassLink,
      onEdit: () => setDrawerMode('edit'),
      onFormChange: updateForm,
      onGoNext: goToNextRow,
      onGoPrevious: goToPreviousRow,
      onOpenPage: openClassPage,
      onSave: saveClass
    },
    onToastClose: () => setToast(null)
  }
}
