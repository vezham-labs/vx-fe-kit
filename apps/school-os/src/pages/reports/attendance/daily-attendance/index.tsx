import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dailyAttendanceConfig,
  dateOptions,
  rowCountOptions,
  statusLegend
} from './data'

const DailyAttendancePage = () => {
  return (
    <ReportTablePage
      key={dailyAttendanceConfig.key}
      config={dailyAttendanceConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default DailyAttendancePage
