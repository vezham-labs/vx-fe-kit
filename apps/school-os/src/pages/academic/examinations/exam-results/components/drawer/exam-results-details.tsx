import { Chip } from '@vezham/react-v3'

import type {
  ClassDetailSummaryProps,
  ClassDetailsProps,
  DetailLineProps
} from '../../types'
import { getClassTags } from '../../utils/exam-results'
import { classNames } from '../../variants'

export function ExamResultsDetails({ row }: ClassDetailsProps) {
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
      <DetailLine label="Name" value={row.name} />
      <DetailLine label="English" value={row.english} />
      <DetailLine label="Spanish" value={row.spanish} />
      <DetailLine label="Maths" value={row.maths} />
      <DetailLine label="Computer" value={row.computer} />
      <DetailLine label="Env Science" value={row.envscience} />
      <DetailLine label="Physics" value={row.physics} />
      <DetailLine label="Chemistry" value={row.chemistry} />
      <DetailLine label="total" value={row.total} />
      <DetailLine label="Percent" value={row.percent} />
      <DetailLine label="Grade" value={row.grade} />

      <div className={classNames.detailChipRow}>
        <span className={classNames.detailHeading}>Result:</span>
        <Chip
          color={row.result === 'Pass' ? 'success' : 'danger'}
          variant="soft">
          <span aria-hidden="true">●</span>
          <Chip.Label>{row.result}</Chip.Label>
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
