import type { ClassFormErrors, ClassFormState, ClassRow } from '../types'

export function getClassTags(row: ClassRow) {
  return [
    `Grade ${row.grade}`,
    `Percentage ${row.percentage}`,
    `Points ${row.points}`,
    row.status
  ]
}

export function getDrawerTitle(row: ClassRow) {
  return row.id.startsWith('#') ? row.id : `#${row.id}`
}

export function rowToForm(row: ClassRow): ClassFormState {
  return {
    grade: row.grade,
    marksfrom: getMarksFrom(row.percentage),
    marksupto: getMarksUpto(row.percentage),
    percentage: row.percentage,
    description: '',
    points: row.points,
    status: row.status
  }
}

export function validateClassForm(form: ClassFormState) {
  const errors: ClassFormErrors = {}

  if (!form.grade.trim()) {
    errors.grade = 'Grade is required.'
  }

  if (!form.marksfrom.trim()) {
    errors.marksfrom = 'Marks from is required.'
  }

  if (!form.marksupto.trim()) {
    errors.marksupto = 'Marks upto is required.'
  }

  if (!form.points.trim()) {
    errors.points = 'Grade points is required.'
  }

  if (form.marksfrom && form.marksupto) {
    const marksFrom = Number(form.marksfrom)
    const marksUpto = Number(form.marksupto)

    if (Number.isFinite(marksFrom) && Number.isFinite(marksUpto)) {
      if (marksFrom >= marksUpto) {
        errors.marksupto = 'Marks upto must be greater than marks from.'
      }
    }
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export function createNextClassId(rows: ClassRow[]) {
  const nextNumber =
    Math.max(0, ...rows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1

  return `G${String(nextNumber).padStart(6, '0')}`
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

export function getPercentageRange(form: ClassFormState) {
  if (form.percentage.trim()) {
    return form.percentage.trim()
  }

  return `${form.marksfrom}% - ${form.marksupto}%`
}

function getMarksFrom(value: string) {
  return value.match(/^(\d+)%/)?.[1] ?? ''
}

function getMarksUpto(value: string) {
  return value.match(/-\s*(\d+)%$/)?.[1] ?? ''
}
