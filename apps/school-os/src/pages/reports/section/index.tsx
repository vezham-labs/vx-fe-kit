import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  reportsByTitle,
  rowCountOptions,
  statusLegend
} from './data'

type Props = {
  title: string
}

const ReportsSectionPage = ({ title }: Props) => {
  const report = reportsByTitle[title] ?? reportsByTitle['Attendance Report']

  return (
    <ReportTablePage
      key={report.key}
      config={report}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default ReportsSectionPage
