import { Input, Label, ListBox, Select, Switch } from '@vezham/react-v3'

import { sectionOptions, subjectOptions } from '../../data'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Class</Label>
          <Input
            fullWidth
            aria-label="Start time"
            aria-invalid={Boolean(formErrors.classes)}
            value={form.classes}
            onChange={event => onFormChange('classes', event.target.value)}
          />
          {formErrors.classes && (
            <p className={classNames.fieldError}>{formErrors.classes}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="section"
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
            <p className={classNames.fieldError}>{formErrors.section}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="subject"
            aria-invalid={Boolean(formErrors.subject)}
            placeholder="Select subject"
            value={form.subject || null}
            onChange={value =>
              onFormChange('subject', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Subject</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {subjectOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.subject && (
            <p className={classNames.fieldError}>{formErrors.subject}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Homework Date</Label>
          <Input
            fullWidth
            aria-label="homework date"
            aria-invalid={Boolean(formErrors.homeworkdate)}
            value={form.homeworkdate}
            onChange={event => onFormChange('homeworkdate', event.target.value)}
          />
          {formErrors.homeworkdate && (
            <p className={classNames.fieldError}>{formErrors.homeworkdate}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Submission Date</Label>
          <Input
            fullWidth
            aria-label="submission date"
            aria-invalid={Boolean(formErrors.submissiondate)}
            value={form.submissiondate}
            onChange={event =>
              onFormChange('submissiondate', event.target.value)
            }
          />
          {formErrors.submissiondate && (
            <p className={classNames.fieldError}>{formErrors.submissiondate}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Attachments</Label>
          <Input
            fullWidth
            aria-label="attachments"
            aria-invalid={Boolean(formErrors.attachments)}
            value={form.attachments}
            onChange={event => onFormChange('attachments', event.target.value)}
          />
          {formErrors.attachments && (
            <p className={classNames.fieldError}>{formErrors.attachments}</p>
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
