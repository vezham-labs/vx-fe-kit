import type {
  AttendanceFormErrors,
  AttendanceFormState,
  AttendanceRow,
  AttendanceStatus
} from '../types'

export function getAttendanceChipColor(
  status: AttendanceStatus
): 'success' | 'danger' | 'accent' {
  if (status === 'Present') {
    return 'success'
  }

  if (status === 'Absent') {
    return 'danger'
  }

  return 'accent'
}

export function getAttendanceTags(row: AttendanceRow) {
  return [
    row.classes ? `Class ${row.classes}` : null,
    row.section ? `Section ${row.section}` : null,
    row.examtype,
    row.status
  ].filter((tag): tag is string => Boolean(tag))
}

export function getStudentSecondaryText(row: AttendanceRow) {
  if (row.rollNo) {
    return `Roll No : ${row.rollNo}`
  }

  if (row.email) {
    return row.email
  }

  return [row.classes, row.section].filter(Boolean).join(' - ')
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
}

export function getDrawerTitle(row: AttendanceRow) {
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

export function rowToForm(row: AttendanceRow): AttendanceFormState {
  return {
    name: row.name,
    english: row.english,
    spanish: row.spanish,
    physics: row.physics,
    chemistry: row.chemistry,
    maths: row.maths,
    computer: row.computer,
    envscience: row.envscience,
    status: row.status
  }
}

export function validateAttendanceForm(form: AttendanceFormState) {
  const errors: AttendanceFormErrors = {}

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export function createNextAttendanceId(rows: AttendanceRow[]) {
  const nextNumber =
    Math.max(0, ...rows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1

  return `EA${String(nextNumber).padStart(6, '0')}`
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
