import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  rowCountOptions,
  statusLegend,
  teacherDayWiseConfig
} from './data'

const TeacherDayWisePage = () => {
  return (
    <ReportTablePage
      key={teacherDayWiseConfig.key}
      config={teacherDayWiseConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default TeacherDayWisePage
