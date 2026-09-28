import { Alert, CloseButton } from '@vezham/react-v3'

import type { ToastState } from '@pages/academic/examinations/exam/types'
import { classNames } from '@pages/academic/examinations/exam/variants'

type ExamToastProps = {
  toast: ToastState
  onClose: () => void
}

export function ExamToast({ toast, onClose }: ExamToastProps) {
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
