import { Input, Label, ListBox, Select } from '@vezham/react-v3'

import { roleOptions } from '@pages/academic/reasons/data'
import type { ClassFormProps } from '@pages/academic/reasons/types'
import { classNames } from '@pages/academic/reasons/variants'
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
        aria-label="Role"
        aria-invalid={Boolean(formErrors.role)}
        placeholder="Select role"
        value={form.role || null}
        onChange={value => onFormChange('role', value ? String(value) : '')}>
        <Label className={classNames.fieldLabel}>Role</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {roleOptions.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {formErrors.role && (
        <p className={classNames.selectError}>{formErrors.role}</p>
      )}

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
