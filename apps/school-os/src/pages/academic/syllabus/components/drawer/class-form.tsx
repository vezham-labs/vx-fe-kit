import { Input, Label, ListBox, Select } from '@vezham/react-v3'

import { classOptions, sectionOptions } from '../../data'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <Select
        fullWidth
        aria-label="Class"
        aria-invalid={Boolean(formErrors.classes)}
        placeholder="Select classes"
        value={form.classes || null}
        onChange={value => onFormChange('classes', value ? String(value) : '')}>
        <Label className={classNames.fieldLabel}>Class</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {classOptions.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {formErrors.classes && (
        <p className={classNames.selectError}>{formErrors.classes}</p>
      )}

      <Select
        fullWidth
        aria-label="Section"
        aria-invalid={Boolean(formErrors.section)}
        placeholder="Select section"
        value={form.section || null}
        onChange={value => onFormChange('section', value ? String(value) : '')}>
        <Label className={classNames.fieldLabel}>Section</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {sectionOptions.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {formErrors.section && (
        <p className={classNames.selectError}>{formErrors.section}</p>
      )}

      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Subject Group</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.subject)}
            placeholder="Enter subject"
            value={form.subject}
            onChange={event => onFormChange('subject', event.target.value)}
          />
          {formErrors.subject && (
            <p className={classNames.fieldError}>{formErrors.subject}</p>
          )}
        </div>
      </div>
    </div>
  )
}
