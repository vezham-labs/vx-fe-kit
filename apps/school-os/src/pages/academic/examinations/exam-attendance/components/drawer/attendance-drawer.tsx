import type { AttendanceDrawerProps } from '@pages/academic/examinations/exam-attendance/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam-attendance/utils/exam-attendance'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'
import { EntityDrawer } from '@pages/academic/shared/entity-drawer'

import { AttendanceDetails } from './attendance-details'
import { AttendanceForm } from './attendance-form'

export const AttendanceDrawer = (props: AttendanceDrawerProps) => {
  const { form, formErrors, mode, row, onFormChange } = props
  const title =
    mode === 'create' ? 'Add Exam Attendance' : row ? getDrawerTitle(row) : ''

  return (
    <EntityDrawer
      {...props}
      classes={classNames}
      createLabel="Add Exam Attendance"
      detailsContent={<AttendanceDetails row={row} />}
      formContent={
        <AttendanceForm
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
