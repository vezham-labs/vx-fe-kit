import {
  AddCircle as AddCircleIcon,
  TrashBinTrash as TrashBinTrashIcon
} from '@vezham/icons-react'
import { Button, Input, Label, ListBox, Select } from '@vezham/react-v3'

import {
  classOptions,
  durationOptions,
  emptyForm,
  examOptions,
  examdateOptions,
  roomOptions,
  sectionOptions,
  statusOptions,
  subjectOptions
} from '../../data'
import type { ClassFormProps, ClassStatus } from '../../types'
import { classNames } from '../../variants'

export function ScheduleForm({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) {
  const scheduleRows = form.scheduleRows.length
    ? form.scheduleRows
    : emptyForm.scheduleRows

  const updateStatus = (value: string | number | null) => {
    const nextStatus =
      value && statusOptions.includes(value as ClassStatus)
        ? (value as ClassStatus)
        : 'Active'

    onFormChange('status', nextStatus)
  }

  const updateScheduleRow = (
    rowId: string,
    field: keyof (typeof scheduleRows)[number],
    value: string
  ) => {
    onFormChange(
      'scheduleRows',
      scheduleRows.map(scheduleRow =>
        scheduleRow.id === rowId
          ? { ...scheduleRow, [field]: value }
          : scheduleRow
      )
    )
  }

  const addScheduleRow = () => {
    onFormChange('scheduleRows', [
      ...scheduleRows,
      {
        id: `schedule-row-${Date.now()}`,
        date: '',
        subject: '',
        classroom: '',
        maximum: '',
        minimum: ''
      }
    ])
  }

  const deleteScheduleRow = (rowId: string) => {
    if (scheduleRows.length === 1) {
      return
    }

    onFormChange(
      'scheduleRows',
      scheduleRows.filter(scheduleRow => scheduleRow.id !== rowId)
    )
  }

  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.scheduleTopGrid}>
          <Select
            fullWidth
            aria-label="Class"
            aria-invalid={Boolean(formErrors.classes)}
            placeholder="Select class"
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
            <p className={classNames.fieldError}>{formErrors.section}</p>
          )}

          <Select
            fullWidth
            aria-label="Exam name"
            aria-invalid={Boolean(formErrors.examName)}
            placeholder="Select exam name"
            value={form.examName || null}
            onChange={value =>
              onFormChange('examName', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Exam Name</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {examOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.examName && (
            <p className={classNames.fieldError}>{formErrors.examName}</p>
          )}

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

          <Select
            fullWidth
            aria-label="Duration"
            aria-invalid={Boolean(formErrors.duration)}
            placeholder="Select duration"
            value={form.duration || null}
            onChange={value =>
              onFormChange('duration', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Duration(min)</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {durationOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.duration && (
            <p className={classNames.fieldError}>{formErrors.duration}</p>
          )}
        </div>

        <div className={classNames.scheduleRows}>
          {scheduleRows.map((scheduleRow, index) => (
            <div key={scheduleRow.id} className={classNames.scheduleRow}>
              <Select
                fullWidth
                aria-label={`Exam date ${index + 1}`}
                placeholder="Select"
                value={scheduleRow.date || null}
                onChange={value =>
                  updateScheduleRow(
                    scheduleRow.id,
                    'date',
                    value ? String(value) : ''
                  )
                }>
                <Label className={classNames.fieldLabel}>Exam Date</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {examdateOptions.map(option => (
                      <ListBox.Item key={option} id={option} textValue={option}>
                        {option}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <Select
                fullWidth
                aria-label={`Subject ${index + 1}`}
                placeholder="Select"
                value={scheduleRow.subject || null}
                onChange={value =>
                  updateScheduleRow(
                    scheduleRow.id,
                    'subject',
                    value ? String(value) : ''
                  )
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

              <Select
                fullWidth
                aria-label={`Room number ${index + 1}`}
                placeholder="Select"
                value={scheduleRow.classroom || null}
                onChange={value =>
                  updateScheduleRow(
                    scheduleRow.id,
                    'classroom',
                    value ? String(value) : ''
                  )
                }>
                <Label className={classNames.fieldLabel}>Room No</Label>
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

              <div className={classNames.field}>
                <Label className={classNames.fieldLabel}>Max Marks</Label>
                <Input
                  fullWidth
                  aria-label={`Max marks ${index + 1}`}
                  placeholder="Select"
                  value={scheduleRow.maximum}
                  onChange={event =>
                    updateScheduleRow(
                      scheduleRow.id,
                      'maximum',
                      event.target.value
                    )
                  }
                />
              </div>

              <div className={classNames.field}>
                <Label className={classNames.fieldLabel}>Min Marks</Label>
                <Input
                  fullWidth
                  aria-label={`Min marks ${index + 1}`}
                  placeholder="Select"
                  value={scheduleRow.minimum}
                  onChange={event =>
                    updateScheduleRow(
                      scheduleRow.id,
                      'minimum',
                      event.target.value
                    )
                  }
                />
              </div>

              <Button
                isIconOnly
                aria-label={`Delete schedule row ${index + 1}`}
                className={classNames.scheduleDeleteButton}
                isDisabled={scheduleRows.length === 1}
                variant="secondary"
                onPress={() => deleteScheduleRow(scheduleRow.id)}>
                <TrashBinTrashIcon size={18} aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>

        {formErrors.scheduleRows && (
          <p className={classNames.fieldError}>{formErrors.scheduleRows}</p>
        )}

        <div>
          <Button onPress={addScheduleRow}>
            <AddCircleIcon size={16} aria-hidden="true" />
            Add New
          </Button>
        </div>
      </div>

      <div className={classNames.statusRow}>
        <Select
          fullWidth
          aria-label="Status"
          aria-invalid={Boolean(formErrors.status)}
          placeholder="Select status"
          value={form.status}
          onChange={updateStatus}>
          <Label className={classNames.fieldLabel}>Status</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {statusOptions.map(option => (
                <ListBox.Item key={option} id={option} textValue={option}>
                  {option}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
      {formErrors.status && (
        <p className={classNames.selectError}>{formErrors.status}</p>
      )}
    </div>
  )
}
