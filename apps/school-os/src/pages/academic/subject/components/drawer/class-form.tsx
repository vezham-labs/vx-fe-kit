import { Input, Label, ListBox, Select } from '@vezham/react-v3'

import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'
import { codeOptions, typeOptions } from '@pages/academic/subject/data'
import type { ClassFormProps } from '@pages/academic/subject/types'
import { classNames } from '@pages/academic/subject/variants'

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

      <AcademicSelectField
        ariaLabel="Type"
        error={formErrors.type}
        errorClassName={classNames.selectError}
        label="Type"
        labelClassName={classNames.fieldLabel}
        options={typeOptions}
        placeholder="Select type"
        value={form.type}
        onChange={value => onFormChange('type', value)}
      />

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
