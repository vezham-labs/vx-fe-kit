import { Chip } from '@vezham/react-v3'

import type {
  ClassDetailSummaryProps,
  ClassDetailsProps,
  DetailLineProps
} from '../../types'
import { getClassTags } from '../../utils/homework'
import { classNames } from '../../variants'

export function ClassDetails({ row }: ClassDetailsProps) {
  if (!row) {
    return null
  }

  return (
    <div className={classNames.details}>
      <ClassDetailSummary row={row} />
    </div>
  )
}

function ClassDetailSummary({ row }: ClassDetailSummaryProps) {
  return (
    <div className={classNames.detailSummary}>
      <DetailLine label="Class" value={row.classes} />
      <DetailLine label="Section" value={row.section} />
      <DetailLine label="Subject" value={row.subject} />
      <DetailLine label="Homework Date" value={row.homeworkdate} />
      <DetailLine label="Submission Date" value={row.submissiondate} />
      <DetailLine label="Attachments" value={row.attachments ?? '-'} />

      <div className={classNames.detailChipRow}>
        <span className={classNames.detailHeading}>Status:</span>
        <Chip
          color={row.status === 'Active' ? 'success' : 'danger'}
          variant="soft">
          <span aria-hidden="true">●</span>
          <Chip.Label>{row.status}</Chip.Label>
        </Chip>
      </div>

      <div className={classNames.detailTagsRow}>
        <span className={classNames.detailHeading}>Tags:</span>
        {getClassTags(row).map(tag => (
          <Chip key={tag} variant="soft">
            <Chip.Label>{tag}</Chip.Label>
          </Chip>
        ))}
      </div>
    </div>
  )
}

function DetailLine({ label, value }: DetailLineProps) {
  return (
    <div className={classNames.detailLine}>
      <span className={classNames.fieldLabel}>{label}:</span>
      <span className={classNames.detailValue}>{value}</span>
    </div>
  )
}
