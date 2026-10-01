import type { SectionAction } from '@vx/react/layouts/section'

const createLabels: Record<string, string> = {
  allclasses: 'Add Class',
  schedule: 'Add Schedule',
  classroom: 'Add Classroom',
  classroutine: 'Add Class Routine',
  section: 'Add Section',
  syllabus: 'Add Subject Group',
  reasons: 'Add Reactions',
  subject: 'Add Subject',
  timetable: 'Add Timetable',
  homework: 'Add Homework',
  exam: 'Add Exam',
  'exam-schedule': 'Add Exam Schedule',
  grades: 'Add Grades'
}

export const getToolbarActions = (page: { key: string; title: string }) => {
  const onAction = (action: string) => () => {
    window.dispatchEvent(
      new CustomEvent('demo:toolbar-action', {
        detail: { action, pageKey: page.key }
      })
    )
  }
  const menuActions: SectionAction[] = [
    {
      key: 'import',
      label: 'Import',
      icon: 'vx:upload',
      onAction: onAction('import')
    },
    {
      key: 'print',
      label: 'Print',
      icon: 'vx:printer',
      onAction: () => window.print()
    },
    {
      key: 'export',
      label: 'Export',
      icon: 'vx:download',
      children: [
        {
          key: 'export-pdf',
          label: 'Export as PDF',
          icon: 'vx:file-text',
          onAction: onAction('export-pdf')
        },
        {
          key: 'export-excel',
          label: 'Export as Excel',
          icon: 'vx:file-spreadsheet',
          onAction: onAction('export-excel')
        }
      ]
    }
  ]
  const primaryAction = ['exam-attendance', 'exam-results'].includes(page.key)
    ? undefined
    : {
        key: 'create',
        label: createLabels[page.key] ?? `Add ${page.title}`,
        icon: 'vx:plus',
        onAction: onAction('create')
      }
  return { menuActions, primaryAction }
}
