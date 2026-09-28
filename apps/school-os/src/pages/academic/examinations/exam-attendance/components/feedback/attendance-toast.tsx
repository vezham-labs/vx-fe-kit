import { Alert, CloseButton } from '@vezham/react-v3'

import type { ToastState } from '@pages/academic/examinations/exam-attendance/types'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'

type AttendanceToastProps = {
  toast: ToastState
  onClose: () => void
}

export function AttendanceToast({ toast, onClose }: AttendanceToastProps) {
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
