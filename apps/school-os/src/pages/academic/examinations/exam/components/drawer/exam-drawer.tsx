import type { ClassDrawerProps } from '@pages/academic/examinations/exam/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam/utils/exam'
import { classNames } from '@pages/academic/examinations/exam/variants'
import { EntityDrawer } from '@pages/academic/shared/entity-drawer'

import { ExamDetails } from './exam-details'
import { ExamForm } from './exam-form'

export const ExamDrawer = (props: ClassDrawerProps) => {
  const { form, formErrors, mode, row, onFormChange } = props
  const title = mode === 'create' ? 'Add Exam' : row ? getDrawerTitle(row) : ''

  return (
    <EntityDrawer
      {...props}
      classes={classNames}
      createLabel="Add Exam"
      detailsContent={<ExamDetails row={row} />}
      formContent={
        <ExamForm
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
