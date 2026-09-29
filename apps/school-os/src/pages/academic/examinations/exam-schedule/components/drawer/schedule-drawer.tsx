import type { ClassDrawerProps } from '@pages/academic/examinations/exam-schedule/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam-schedule/utils/exam-schedule'
import { classNames } from '@pages/academic/examinations/exam-schedule/variants'
import { EntityDrawer } from '@pages/academic/shared/entity-drawer'

import { ScheduleDetails } from './schedule-details'
import { ScheduleForm } from './schedule-form'

export const ScheduleDrawer = (props: ClassDrawerProps) => {
  const { form, formErrors, mode, row, onFormChange } = props
  const title =
    mode === 'create' ? 'Add Exam Schedule' : row ? getDrawerTitle(row) : ''

  return (
    <EntityDrawer
      {...props}
      classes={classNames}
      createLabel="Add Exam Schedule"
      detailsContent={<ScheduleDetails row={row} />}
      formContent={
        <ScheduleForm
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
