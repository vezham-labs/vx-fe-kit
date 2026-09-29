import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  attendanceReportConfig,
  dateOptions,
  rowCountOptions,
  statusLegend
} from './data'

const AttendanceReportPage = () => {
  return (
    <ReportTablePage
      key={attendanceReportConfig.key}
      config={attendanceReportConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default AttendanceReportPage
