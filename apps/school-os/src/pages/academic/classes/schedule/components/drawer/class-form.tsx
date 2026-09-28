import { Label, ListBox, Select, Switch } from '@vezham/react-v3'

import {
  endtimeOptions,
  starttimeOptions,
  typeOptions
} from '../../../../../../store/useAcademic/useClassSchedule'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Type"
            aria-invalid={Boolean(formErrors.type)}
            placeholder="Select type"
            value={form.type || null}
            onChange={value =>
              onFormChange('type', value ? String(value) : '')
            }>
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
            <p className={classNames.fieldError}>{formErrors.type}</p>
          )}
        </div>

        <Select
          fullWidth
          aria-label="Start time"
          aria-invalid={Boolean(formErrors.starttime)}
          placeholder="Select start time"
          value={form.starttime || null}
          onChange={value =>
            onFormChange('starttime', value ? String(value) : '')
          }>
          <Label className={classNames.fieldLabel}>Start Time</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {starttimeOptions.map(option => (
                <ListBox.Item key={option} id={option} textValue={option}>
                  {option}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        {formErrors.starttime && (
          <p className={classNames.selectError}>{formErrors.starttime}</p>
        )}

        <Select
          fullWidth
          aria-label="End time"
          aria-invalid={Boolean(formErrors.endtime)}
          placeholder="Select end time"
          value={form.endtime || null}
          onChange={value =>
            onFormChange('endtime', value ? String(value) : '')
          }>
          <Label className={classNames.fieldLabel}>End Time</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {endtimeOptions.map(option => (
                <ListBox.Item key={option} id={option} textValue={option}>
                  {option}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        {formErrors.endtime && (
          <p className={classNames.selectError}>{formErrors.endtime}</p>
        )}
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
