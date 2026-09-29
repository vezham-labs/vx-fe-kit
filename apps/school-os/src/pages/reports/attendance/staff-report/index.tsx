import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  rowCountOptions,
  staffReportConfig,
  statusLegend
} from './data'

const StaffReportPage = () => {
  return (
    <ReportTablePage
      key={staffReportConfig.key}
      config={staffReportConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default StaffReportPage
