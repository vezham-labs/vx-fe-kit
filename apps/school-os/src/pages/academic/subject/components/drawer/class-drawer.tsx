import { EntityDrawer } from '@pages/academic/shared/entity-drawer'
import type { ClassDrawerProps } from '@pages/academic/subject/types'
import { getDrawerTitle } from '@pages/academic/subject/utils/subject'
import { classNames } from '@pages/academic/subject/variants'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => {
  const { form, formErrors, mode, row, onFormChange } = props
  const title =
    mode === 'create' ? 'Add Subject' : row ? getDrawerTitle(row) : ''

  return (
    <EntityDrawer
      {...props}
      classes={classNames}
      createLabel="Add Subject"
      detailsContent={<ClassDetails row={row} />}
      formContent={
        <ClassForm
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
