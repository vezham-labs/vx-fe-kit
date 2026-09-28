import { Alert, CloseButton } from '@vezham/react-v3'

import type { ToastState } from '@pages/academic/reasons/types'
import { classNames } from '@pages/academic/reasons/variants'

type ReasonsToastProps = {
  toast: ToastState
  onClose: () => void
}

export function ReasonsToast({ toast, onClose }: ReasonsToastProps) {
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
