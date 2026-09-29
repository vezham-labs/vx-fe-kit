import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  rowCountOptions,
  statusLegend,
  teacherReportConfig
} from './data'

const TeacherReportPage = () => {
  return (
    <ReportTablePage
      key={teacherReportConfig.key}
      config={teacherReportConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default TeacherReportPage
