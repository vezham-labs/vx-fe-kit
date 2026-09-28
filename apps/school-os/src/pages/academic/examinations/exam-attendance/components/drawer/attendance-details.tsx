import { Chip } from '@vezham/react-v3'

import type {
  AttendanceDetailSummaryProps,
  AttendanceDetailsProps,
  DetailLineProps
} from '../../types'
import {
  getAttendanceChipColor,
  getAttendanceTags
} from '../../utils/exam-attendance'
import { classNames } from '../../variants'

export function AttendanceDetails({ row }: AttendanceDetailsProps) {
  if (!row) {
    return null
  }

  return (
    <div className={classNames.details}>
      <AttendanceDetailSummary row={row} />
    </div>
  )
}

function AttendanceDetailSummary({ row }: AttendanceDetailSummaryProps) {
  return (
    <div className={classNames.detailSummary}>
      <DetailLine label="Name" value={row.name} />
      <DetailLine label="English" value={row.english} />
      <DetailLine label="Spanish" value={row.spanish} />
      <DetailLine label="Physics" value={row.physics} />
      <DetailLine label="Chemistry" value={row.chemistry} />
      <DetailLine label="Maths" value={row.maths} />
      <DetailLine label="Computer" value={row.computer} />
      <DetailLine label="Env Science" value={row.envscience} />

      <div className={classNames.detailChipRow}>
        <span className={classNames.detailHeading}>Status:</span>
        <Chip color={getAttendanceChipColor(row.status)} variant="soft">
          <span aria-hidden="true">●</span>
          <Chip.Label>{row.status}</Chip.Label>
        </Chip>
      </div>

      <div className={classNames.detailTagsRow}>
        <span className={classNames.detailHeading}>Tags:</span>
        {getAttendanceTags(row).map(tag => (
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
