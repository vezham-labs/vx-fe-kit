import { Input, Label, Switch } from '@vezham/react-v3'

import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
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

      <div className={classNames.statusRow}>
        <div>
          <div className={classNames.fieldLabel}>Status</div>
          <div className={classNames.statusHelp}>
            Change the Status by toggle
          </div>
        </div>
        <Switch
          aria-label="Class status"
          isSelected={form.status === 'Active'}
          onChange={isSelected =>
            onFormChange('status', isSelected ? 'Active' : 'Inactive')
          }>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch>
      </div>
    </div>
  )
}
