import {
  pickupPointsConfig,
  usePickupPoints
} from '../../../../store/useOperations/useTransport/usePickupPoints'
import OperationsTablePage from '../../_shared'

export default function PickupPointsOperationsPage() {
  const { data } = usePickupPoints.list({})

  return <OperationsTablePage config={{ ...pickupPointsConfig, rows: data }} />
}
