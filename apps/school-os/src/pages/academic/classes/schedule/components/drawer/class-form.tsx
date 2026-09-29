import type { ClassFormProps } from '@pages/academic/classes/schedule/types'
import { classNames } from '@pages/academic/classes/schedule/variants'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'
import {
  endtimeOptions,
  starttimeOptions,
  typeOptions
} from '@store/useAcademic/useClassSchedule'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <AcademicSelectField
            ariaLabel="Type"
            error={formErrors.type}
            errorClassName={classNames.fieldError}
            label="Type"
            labelClassName={classNames.fieldLabel}
            options={typeOptions}
            placeholder="Select type"
            value={form.type}
            onChange={value => onFormChange('type', value)}
          />
        </div>

        <AcademicSelectField
          ariaLabel="Start time"
          error={formErrors.starttime}
          errorClassName={classNames.selectError}
          label="Start Time"
          labelClassName={classNames.fieldLabel}
          options={starttimeOptions}
          placeholder="Select start time"
          value={form.starttime}
          onChange={value => onFormChange('starttime', value)}
        />

        <AcademicSelectField
          ariaLabel="End time"
          error={formErrors.endtime}
          errorClassName={classNames.selectError}
          label="End Time"
          labelClassName={classNames.fieldLabel}
          options={endtimeOptions}
          placeholder="Select end time"
          value={form.endtime}
          onChange={value => onFormChange('endtime', value)}
        />
      </div>

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
