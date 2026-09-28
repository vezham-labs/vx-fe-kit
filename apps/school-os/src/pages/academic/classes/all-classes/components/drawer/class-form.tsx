import { Input, Label, ListBox, Select, Switch } from '@vezham/react-v3'

import { sectionOptions } from '../../../../../../store/useAcademic/useAllClasses'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Class Name</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.className)}
            placeholder="Enter class name"
            value={form.className}
            onChange={event => onFormChange('className', event.target.value)}
          />
          {formErrors.className && (
            <p className={classNames.fieldError}>{formErrors.className}</p>
          )}
        </div>

        <Select
          fullWidth
          aria-label="Section"
          aria-invalid={Boolean(formErrors.section)}
          placeholder="Select section"
          value={form.section || null}
          onChange={value =>
            onFormChange('section', value ? String(value) : '')
          }>
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

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>No of Students</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.students)}
            min={0}
            placeholder="Enter students"
            type="number"
            value={form.students}
            onChange={event => onFormChange('students', event.target.value)}
          />
          {formErrors.students && (
            <p className={classNames.fieldError}>{formErrors.students}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>No of Subjects</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.subjects)}
            min={0}
            placeholder="Enter subjects"
            type="number"
            value={form.subjects}
            onChange={event => onFormChange('subjects', event.target.value)}
          />
          {formErrors.subjects && (
            <p className={classNames.fieldError}>{formErrors.subjects}</p>
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
    </div>
  )
}
