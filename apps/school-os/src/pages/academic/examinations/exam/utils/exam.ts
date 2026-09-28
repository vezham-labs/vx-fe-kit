import type { ClassFormErrors, ClassFormState, ClassRow } from '../types'

export function getClassTags(row: ClassRow) {
  return [`Grade ${row.name}`, `Grade ${row.date}`, row.status]
}

export function getDrawerTitle(row: ClassRow) {
  const values = row as Record<string, unknown>
  const idValue =
    getDrawerText(values.displayId) ||
    getDrawerText(values.refId) ||
    getDrawerText(values.studentId) ||
    getDrawerText(values.admissionNo) ||
    getDrawerText(values.admissionNumber) ||
    getDrawerText(values.serialNo) ||
    getDrawerText(values.sNo) ||
    getDrawerText(values.id)
  const nameValue =
    getDrawerText(values.name) ||
    getDrawerText(values.studentName) ||
    getDrawerText(values.staffName) ||
    getDrawerText(values.teacherName)

  if (idValue) {
    return idValue.startsWith('#') ? idValue : `#${idValue}`
  }

  return nameValue || '-'
}

export function rowToForm(row: ClassRow): ClassFormState {
  return {
    name: row.name,
    date: row.date,
    starttime: row.starttime,
    endtime: row.endtime,
    status: row.status
  }
}

export function validateClassForm(form: ClassFormState) {
  const errors: ClassFormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Exam Name is required.'
  }

  if (!form.date?.trim()) {
    errors.date = 'Exam Date is required.'
  }

  if (!form.starttime.trim()) {
    errors.starttime = 'Start time is required.'
  }

  if (!form.endtime.trim()) {
    errors.endtime = 'End time is required.'
  }

  if (
    form.starttime &&
    form.endtime &&
    parseTimeOption(form.endtime) <= parseTimeOption(form.starttime)
  ) {
    errors.endtime = 'End time must be after start time.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export function createNextClassId(rows: ClassRow[]) {
  const nextNumber =
    Math.max(0, ...rows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1

  return `E${String(nextNumber).padStart(6, '0')}`
}

export function getPaginationSummary(
  page: number,
  pageSize: number,
  total: number
) {
  if (!total) {
    return '0 of 0'
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return `${start}-${end} of ${total}`
}

function getDrawerText(value: unknown) {
  if (value && typeof value === 'object' && 'name' in value) {
    return String((value as { name?: unknown }).name ?? '').trim()
  }

  if (value === null || value === undefined) return ''

  return String(value).trim().split('\n')[0]
}

function parseTimeOption(value: string) {
  const match = value.match(/^(\d{2})\.(\d{2})\s(AM|PM)$/)

  if (!match) {
    return 0
  }

  const [, hourValue, minuteValue, period] = match
  const hour = Number(hourValue)
  const minute = Number(minuteValue)
  const normalizedHour =
    period === 'PM' ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour

  return normalizedHour * 60 + minute
}
