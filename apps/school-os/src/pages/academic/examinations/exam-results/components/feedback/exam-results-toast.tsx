import { Alert, CloseButton } from '@vezham/react-v3'

import type { ToastState } from '@pages/academic/examinations/exam-results/types'
import { classNames } from '@pages/academic/examinations/exam-results/variants'

type ExamResultsToastProps = {
  toast: ToastState
  onClose: () => void
}

export function ExamResultsToast({ toast, onClose }: ExamResultsToastProps) {
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
