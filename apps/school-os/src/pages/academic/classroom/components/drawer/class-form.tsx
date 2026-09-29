import { Input, Label } from '@vezham/react-v3'

import type { ClassFormProps } from '@pages/academic/classroom/types'
import { classNames } from '@pages/academic/classroom/variants'
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
          <Label className={classNames.fieldLabel}>Room No</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.roomno)}
            placeholder="Enter room no"
            value={form.roomno}
            onChange={event => onFormChange('roomno', event.target.value)}
          />
          {formErrors.roomno && (
            <p className={classNames.fieldError}>{formErrors.roomno}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Capacity</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.capacity)}
            placeholder="Enter capacity"
            value={form.capacity}
            onChange={event => onFormChange('capacity', event.target.value)}
          />
          {formErrors.capacity && (
            <p className={classNames.fieldError}>{formErrors.capacity}</p>
          )}
        </div>
      </div>

      <AcademicStatusSwitch
        ariaLabel="Class status"
        classes={classNames}
        error={formErrors.status}
        selectedStatus="Inactive"
        status={form.status}
        onChange={status => onFormChange('status', status)}
      />
    </div>
  )
}
