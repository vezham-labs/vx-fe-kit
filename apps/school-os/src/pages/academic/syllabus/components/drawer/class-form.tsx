import { Input, Label, ListBox, Select } from '@vezham/react-v3'

import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { classOptions, sectionOptions } from '@pages/academic/syllabus/data'
import type { ClassFormProps } from '@pages/academic/syllabus/types'
import { classNames } from '@pages/academic/syllabus/variants'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
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

      <AcademicSelectField
        ariaLabel="Section"
        error={formErrors.section}
        errorClassName={classNames.selectError}
        label="Section"
        labelClassName={classNames.fieldLabel}
        options={sectionOptions}
        placeholder="Select section"
        value={form.section}
        onChange={value => onFormChange('section', value)}
      />

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
