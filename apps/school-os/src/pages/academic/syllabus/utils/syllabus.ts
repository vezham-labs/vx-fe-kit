import type { ClassFormErrors, ClassFormState, ClassRow } from '../types'

export function getClassTags(row: ClassRow) {
  return [
    `Grade ${row.subject}`,
    `Grade ${row.section}`,
    `Grade ${row.classes}`,
    row.status
  ]
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
    section: row.section,
    status: row.status,
    classes: row.classes,
    subject: row.subject
  }
}

export function validateClassForm(form: ClassFormState) {
  const errors: ClassFormErrors = {}

  if (!form.section.trim()) {
    errors.section = 'Section Name is required.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export function createNextClassId(rows: ClassRow[]) {
  const nextNumber =
    Math.max(0, ...rows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1

  return `C${String(nextNumber).padStart(6, '0')}`
}

export function formatDisplayDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
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
