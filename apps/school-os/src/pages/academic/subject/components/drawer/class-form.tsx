import { Input, Label, ListBox, Select, Switch } from '@vezham/react-v3'

import { codeOptions, typeOptions } from '../../data'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Name</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.name)}
            placeholder="Enter name"
            value={form.name}
            onChange={event => onFormChange('name', event.target.value)}
          />
          {formErrors.name && (
            <p className={classNames.fieldError}>{formErrors.name}</p>
          )}
        </div>
      </div>

      <Select
        fullWidth
        aria-label="Code"
        aria-invalid={Boolean(formErrors.code)}
        placeholder="Select code"
        value={form.code || null}
        onChange={value => onFormChange('code', value ? String(value) : '')}>
        <Label className={classNames.fieldLabel}>Code</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {codeOptions.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {formErrors.code && (
        <p className={classNames.selectError}>{formErrors.code}</p>
      )}

      <Select
        fullWidth
        aria-label="Type"
        aria-invalid={Boolean(formErrors.type)}
        placeholder="Select type"
        value={form.type || null}
        onChange={value => onFormChange('type', value ? String(value) : '')}>
        <Label className={classNames.fieldLabel}>Type</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {typeOptions.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {formErrors.type && (
        <p className={classNames.selectError}>{formErrors.type}</p>
      )}

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
