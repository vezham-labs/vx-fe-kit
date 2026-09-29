import { Input, Label } from '@vezham/react-v3'

import type { ClassFormProps } from '@pages/academic/classes/all-classes/types'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'
import { sectionOptions } from '@store/useAcademic/useAllClasses'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
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

      <AcademicStatusSwitch
        ariaLabel="Class status"
        classes={classNames}
        selectedStatus="Inactive"
        status={form.status}
        onChange={status => onFormChange('status', status)}
      />
    </div>
  )
}
