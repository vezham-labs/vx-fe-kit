import OperationsTablePage from '@pages/operations/_shared'
import {
  libraryMembersConfig,
  useMembers
} from '@store/useOperations/useLibrary/useMembers'

export default function LibraryMembersOperationsPage() {
  const { data } = useMembers.list({})

  return (
    <OperationsTablePage config={{ ...libraryMembersConfig, rows: data }} />
  )
}
