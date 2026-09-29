import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  rowCountOptions,
  statusLegend,
  studentsAttendanceTypeConfig
} from './data'

const StudentsAttendanceTypePage = () => {
  return (
    <ReportTablePage
      key={studentsAttendanceTypeConfig.key}
      config={studentsAttendanceTypeConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default StudentsAttendanceTypePage
