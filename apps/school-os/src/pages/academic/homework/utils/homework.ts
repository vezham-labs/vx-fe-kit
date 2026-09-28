import type { SortDescriptor } from '@vezham/react-v3'

import type { ClassFormErrors, ClassFormState, ClassRow } from '../types'

export function getClassTags(row: ClassRow) {
  return [
    `Grade ${row.classes}`,
    `Grade ${row.section}`,
    `Grade ${row.homeworkdate}`,
    `Grade ${row.subject}`,
    `Grade ${row.submissiondate}`,
    `Grade ${row.attachments ?? '-'}`,
    row.status
  ]
}

export function getSortableValue(
  row: ClassRow,
  column: SortDescriptor['column']
) {
  if (column === 'createdBy') {
    return row.createdBy.name
  }

  return row[column as keyof ClassRow] ?? ''
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
    classes: row.classes,
    section: row.section,
    subject: row.subject,
    homeworkdate: row.homeworkdate,
    submissiondate: row.submissiondate,
    attachments: row.attachments ?? '',
    status: row.status,
    date: row.date ?? ''
  }
}

export function validateClassForm(form: ClassFormState) {
  const errors: ClassFormErrors = {}

  if (!form.classes.trim()) {
    errors.classes = 'Class is required.'
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  if (!form.subject.trim()) {
    errors.subject = 'Subject is required.'
  }

  if (!form.homeworkdate.trim()) {
    errors.homeworkdate = 'Day is required.'
  }
  if (!form.submissiondate.trim()) {
    errors.submissiondate = 'Class Room is required.'
  }

  if (!form.attachments.trim()) {
    errors.attachments = 'End time is required.'
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
