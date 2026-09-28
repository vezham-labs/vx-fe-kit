import { Alert, CloseButton } from '@vezham/react-v3'

import type { ToastState } from '../../types'
import { classNames } from '../../variants'

type RoutineToastProps = {
  toast: ToastState
  onClose: () => void
}

export function RoutineToast({ toast, onClose }: RoutineToastProps) {
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
