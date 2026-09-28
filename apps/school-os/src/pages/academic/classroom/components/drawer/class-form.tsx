import { Input, Label, Switch } from '@vezham/react-v3'

import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
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

      <div className={classNames.statusRow}>
        <div>
          <div className={classNames.fieldLabel}>Status</div>
          <div className={classNames.statusHelp}>
            Change the Status by toggle
          </div>
        </div>
        <Switch
          aria-label="Class status"
          isSelected={form.status === 'Inactive'}
          onChange={isSelected =>
            onFormChange('status', isSelected ? 'Inactive' : 'Active')
          }>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch>
      </div>
      {formErrors.status && (
        <p className={classNames.selectError}>{formErrors.status}</p>
      )}
    </div>
  )
}
