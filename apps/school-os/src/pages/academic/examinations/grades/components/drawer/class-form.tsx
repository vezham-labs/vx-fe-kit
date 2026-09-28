import { Input, Label, ListBox, Select, Switch } from '@vezham/react-v3'

import {
  gradeOptions,
  marksfromOptions,
  marksuptoOptions,
  pointOptions
} from '../../data'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Grade"
            aria-invalid={Boolean(formErrors.grade)}
            placeholder="Select grade"
            value={form.grade || null}
            onChange={value =>
              onFormChange('grade', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Grade</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {gradeOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.grade && (
            <p className={classNames.fieldError}>{formErrors.grade}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Marks from"
            aria-invalid={Boolean(formErrors.marksfrom)}
            placeholder="Select marks from"
            value={form.marksfrom || null}
            onChange={value =>
              onFormChange('marksfrom', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Marks From</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {marksfromOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.marksfrom && (
            <p className={classNames.fieldError}>{formErrors.marksfrom}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Marks upto"
            aria-invalid={Boolean(formErrors.marksupto)}
            placeholder="Select marks upto"
            value={form.marksupto || null}
            onChange={value =>
              onFormChange('marksupto', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Marks upto</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {marksuptoOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.marksupto && (
            <p className={classNames.fieldError}>{formErrors.marksupto}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Grade points"
            aria-invalid={Boolean(formErrors.points)}
            placeholder="Select points"
            value={form.points || null}
            onChange={value =>
              onFormChange('points', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Grade Points</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {pointOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.points && (
            <p className={classNames.fieldError}>{formErrors.points}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Description</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.description)}
            placeholder="Enter description"
            value={form.description}
            onChange={event => onFormChange('description', event.target.value)}
          />
          {formErrors.description && (
            <p className={classNames.fieldError}>{formErrors.description}</p>
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
          aria-label="Grade status"
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
