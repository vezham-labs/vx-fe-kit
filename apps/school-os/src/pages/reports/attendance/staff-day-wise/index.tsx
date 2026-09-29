import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  rowCountOptions,
  staffDayWiseConfig,
  statusLegend
} from './data'

const StaffDayWisePage = () => {
  return (
    <ReportTablePage
      key={staffDayWiseConfig.key}
      config={staffDayWiseConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default StaffDayWisePage
