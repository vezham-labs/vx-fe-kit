import {
  libraryMembersConfig,
  useMembers
} from '../../../../store/useOperations/useLibrary/useMembers'
import OperationsTablePage from '../../_shared'

export default function LibraryMembersOperationsPage() {
  const { data } = useMembers.list({})

  return (
    <OperationsTablePage config={{ ...libraryMembersConfig, rows: data }} />
  )
}
