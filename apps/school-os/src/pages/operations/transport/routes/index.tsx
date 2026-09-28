import {
  routesConfig,
  useRoutes
} from '../../../../store/useOperations/useTransport/useRoutes'
import OperationsTablePage from '../../_shared'

export default function RoutesOperationsPage() {
  const { data } = useRoutes.list({})

  return <OperationsTablePage config={{ ...routesConfig, rows: data }} />
}
