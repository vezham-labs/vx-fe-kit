import type { ClassDrawerProps } from '@pages/academic/examinations/exam-results/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam-results/utils/exam-results'
import { classNames } from '@pages/academic/examinations/exam-results/variants'
import { EntityDrawer } from '@pages/academic/shared/entity-drawer'

import { ExamResultsDetails } from './exam-results-details'
import { ExamResultsForm } from './exam-results-form'

export const ExamResultsDrawer = (props: ClassDrawerProps) => {
  const { form, formErrors, mode, row, onFormChange } = props
  const title =
    mode === 'create' ? 'Add Exam Result' : row ? getDrawerTitle(row) : ''

  return (
    <EntityDrawer
      {...props}
      classes={classNames}
      createLabel="Add Exam Result"
      detailsContent={<ExamResultsDetails row={row} />}
      formContent={
        <ExamResultsForm
          form={form}
          formErrors={formErrors}
          mode={mode}
          row={row}
          onFormChange={onFormChange}
        />
      }
      rowId={row?.id}
      title={title}
      onCopyId={() => row && props.onCopyId(row)}
      onCopyLink={() => row && props.onCopyLink(row)}
      onOpenPage={() => row && props.onOpenPage(row)}
    />
  )
}
