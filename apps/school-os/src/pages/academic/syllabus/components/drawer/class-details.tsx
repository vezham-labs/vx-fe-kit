import { EntityDetailsSummary } from '@pages/academic/shared/entity-details-summary'
import type { ClassDetailsProps } from '@pages/academic/syllabus/types'
import { getClassTags } from '@pages/academic/syllabus/utils/syllabus'
import { classNames } from '@pages/academic/syllabus/variants'

export const ClassDetails = ({ row }: ClassDetailsProps) => {
  if (!row) {
    return null
  }

  return (
    <div className={classNames.details}>
      <EntityDetailsSummary
        classes={classNames}
        label="Section Name"
        status={row.status}
        tags={getClassTags(row)}
        value={row.section}
      />
    </div>
  )
}
