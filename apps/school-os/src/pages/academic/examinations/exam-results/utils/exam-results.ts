import type {
  ClassFormState,
  ClassRow
} from '@pages/academic/examinations/exam-results/types'

export const getClassTags = (row: ClassRow) => {
  return [row.classes, row.section, row.examtype].filter(Boolean)
}

export const getDrawerTitle = (row: ClassRow) => {
  return row.name
}

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    name: row.name,
    english: row.english,
    spanish: row.spanish,
    maths: row.maths,
    physics: row.physics,
    chemistry: row.chemistry,
    computer: row.computer,
    envscience: row.envscience,
    total: row.total,
    percent: row.percent,
    grade: row.grade,
    result: row.result
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: Partial<Record<keyof ClassFormState, string>> = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required'
  }

  return errors
}

export const createNextClassId = (rows: ClassRow[]) => {
  const nextNumber =
    Math.max(...rows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1

  return `AD${nextNumber}`
}

export const getPaginationSummary = (
  page: number,
  pageSize: number,
  total: number
) => {
  if (!total) {
    return '0 of 0'
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)

  return `${start}-${end} of ${total}`
}
