import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  rowCountOptions,
  statusLegend,
  studentDayWiseConfig
} from './data'

const StudentDayWisePage = () => {
  return (
    <ReportTablePage
      key={studentDayWiseConfig.key}
      config={studentDayWiseConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default StudentDayWisePage
