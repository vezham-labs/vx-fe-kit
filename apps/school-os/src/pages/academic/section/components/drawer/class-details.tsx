import type { ClassDetailsProps } from '@pages/academic/section/types'
import { getClassTags } from '@pages/academic/section/utils/section'
import { classNames } from '@pages/academic/section/variants'
import { EntityDetailsSummary } from '@pages/academic/shared/entity-details-summary'

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
