import { Input, Label, ListBox, Select, Switch } from '@vezham/react-v3'

import {
  classOptions,
  dayOptions,
  roomOptions,
  sectionOptions,
  teacherOptions
} from '../../../../../store/useAcademic/useClassRoutine'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Teacher"
            aria-invalid={Boolean(formErrors.teacher)}
            placeholder="Select teacher"
            value={form.teacher || null}
            onChange={value =>
              onFormChange('teacher', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Teacher</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {teacherOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.teacher && (
            <p className={classNames.fieldError}>{formErrors.teacher}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="classes"
            aria-invalid={Boolean(formErrors.classes)}
            placeholder="Select classes"
            value={form.classes || null}
            onChange={value =>
              onFormChange('classes', value ? String(value) : '')
            }>
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
            aria-label="day"
            aria-invalid={Boolean(formErrors.day)}
            placeholder="Select day"
            value={form.day || null}
            onChange={value => onFormChange('day', value ? String(value) : '')}>
            <Label className={classNames.fieldLabel}>Day</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {dayOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.day && (
            <p className={classNames.fieldError}>{formErrors.day}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Start Time</Label>
          <Input
            fullWidth
            aria-label="Start time"
            aria-invalid={Boolean(formErrors.starttime)}
            type="time"
            value={form.starttime}
            onChange={event => onFormChange('starttime', event.target.value)}
          />
          {formErrors.starttime && (
            <p className={classNames.fieldError}>{formErrors.starttime}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>End Time</Label>
          <Input
            fullWidth
            aria-label="End time"
            aria-invalid={Boolean(formErrors.endtime)}
            type="time"
            value={form.endtime}
            onChange={event => onFormChange('endtime', event.target.value)}
          />
          {formErrors.endtime && (
            <p className={classNames.fieldError}>{formErrors.endtime}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="classroom"
            aria-invalid={Boolean(formErrors.classroom)}
            placeholder="Select classroom"
            value={form.classroom || null}
            onChange={value =>
              onFormChange('classroom', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Class Room</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {roomOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.classroom && (
            <p className={classNames.fieldError}>{formErrors.classroom}</p>
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
