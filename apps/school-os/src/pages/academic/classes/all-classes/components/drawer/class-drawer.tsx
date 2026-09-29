import type { ClassDrawerProps } from '@pages/academic/classes/all-classes/types'
import { getDrawerTitle } from '@pages/academic/classes/all-classes/utils/classes'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { EntityDrawer } from '@pages/academic/shared/entity-drawer'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => {
  const { form, formErrors, mode, row, onFormChange } = props
  const title = mode === 'create' ? 'Add Class' : row ? getDrawerTitle(row) : ''

  return (
    <EntityDrawer
      {...props}
      classes={classNames}
      createLabel="Add Class"
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
