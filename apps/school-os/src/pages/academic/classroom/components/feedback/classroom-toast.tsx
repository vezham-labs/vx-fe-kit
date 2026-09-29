import { Alert, CloseButton } from '@vezham/react-v3'

import type { ToastState } from '@pages/academic/classroom/types'
import { classNames } from '@pages/academic/classroom/variants'

type Props = {
  toast: ToastState
  onClose: () => void
}

export const ClassroomToast = ({ toast, onClose }: Props) => {
  return (
    <div className={classNames.toast}>
      <Alert status={toast.status}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{toast.message}</Alert.Title>
        </Alert.Content>
        <CloseButton onClick={onClose} />
      </Alert>
    </div>
  )
}
