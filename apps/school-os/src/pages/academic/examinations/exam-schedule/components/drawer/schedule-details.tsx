import { Chip } from '@vezham/react-v3'

import type {
  ClassDetailSummaryProps,
  ClassDetailsProps,
  DetailLineProps
} from '../../types'
import { getScheduleTags } from '../../utils/exam-schedule'
import { classNames } from '../../variants'

export function ScheduleDetails({ row }: ClassDetailsProps) {
  if (!row) {
    return null
  }

  return (
    <div className={classNames.details}>
      <ScheduleDetailSummary row={row} />
    </div>
  )
}

function ScheduleDetailSummary({ row }: ClassDetailSummaryProps) {
  return (
    <div className={classNames.detailSummary}>
      <DetailLine label="Class" value={row.classes} />
      <DetailLine label="Section" value={row.section} />
      <DetailLine label="Exam Name" value={row.examName} />
      <DetailLine label="Exam Date" value={row.date} />
      <DetailLine label="Subject" value={row.subject} />
      <DetailLine label="Start Time" value={row.starttime} />
      <DetailLine label="End Time" value={row.endtime} />
      <DetailLine label="Duration" value={row.duration} />
      <DetailLine label="Room No" value={row.classroom} />
      <DetailLine label="Max Marks" value={row.maximum} />
      <DetailLine label="Min Marks" value={row.minimum} />

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
        {getScheduleTags(row).map(tag => (
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
