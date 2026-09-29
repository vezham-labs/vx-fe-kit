import { Input, Label } from '@vezham/react-v3'

import type { ClassFormProps } from '@pages/academic/section/types'
import { classNames } from '@pages/academic/section/variants'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Section</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.section)}
            placeholder="Enter section"
            value={form.section}
            onChange={event => onFormChange('section', event.target.value)}
          />
          {formErrors.section && (
            <p className={classNames.fieldError}>{formErrors.section}</p>
          )}
        </div>
      </div>

      <AcademicStatusSwitch
        ariaLabel="Class status"
        classes={classNames}
        selectedStatus="Active"
        status={form.status}
        onChange={status => onFormChange('status', status)}
      />
    </div>
  )
}
