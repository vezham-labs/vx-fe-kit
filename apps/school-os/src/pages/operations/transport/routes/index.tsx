import OperationsTablePage from '@pages/operations/_shared'
import {
  routesConfig,
  useRoutes
} from '@store/useOperations/useTransport/useRoutes'

export default function RoutesOperationsPage() {
  const { data } = useRoutes.list({})

  return <OperationsTablePage config={{ ...routesConfig, rows: data }} />
}
