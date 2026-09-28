import type { ClassFormErrors, ClassFormState, ClassRow } from '../types'

export function getScheduleTags(row: ClassRow) {
  return [
    `Grade ${row.classes}`,
    `Section ${row.section}`,
    row.examName,
    row.subject,
    `Room ${row.classroom}`,
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
    classes: row.classes,
    section: row.section,
    examName: row.examName,
    subject: row.subject,
    date: row.date,
    starttime: row.starttime,
    endtime: row.endtime,
    duration: row.duration,
    classroom: row.classroom,
    maximum: row.maximum,
    minimum: row.minimum,
    status: row.status,
    scheduleRows: [
      {
        id: `${row.id}-schedule`,
        date: row.date,
        subject: row.subject,
        classroom: row.classroom,
        maximum: row.maximum,
        minimum: row.minimum
      }
    ]
  }
}

export function validateScheduleForm(form: ClassFormState) {
  const errors: ClassFormErrors = {}

  if (!form.classes.trim()) {
    errors.classes = 'Class is required.'
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  if (!form.examName.trim()) {
    errors.examName = 'Exam name is required.'
  }

  if (!form.duration.trim()) {
    errors.duration = 'Duration is required.'
  }

  if (
    !form.scheduleRows.length ||
    form.scheduleRows.some(
      scheduleRow =>
        !scheduleRow.date.trim() ||
        !scheduleRow.subject.trim() ||
        !scheduleRow.classroom.trim() ||
        !scheduleRow.maximum.trim() ||
        !scheduleRow.minimum.trim()
    )
  ) {
    errors.scheduleRows = 'Complete every exam schedule row.'
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
  const timeInputMatch = value.match(/^(\d{2}):(\d{2})$/)

  if (timeInputMatch) {
    const [, hourValue, minuteValue] = timeInputMatch
    return Number(hourValue) * 60 + Number(minuteValue)
  }

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
