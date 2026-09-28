export type CallType = 'incoming' | 'outgoing' | 'missed'

export interface Call {
  name: string
  time: string
  type: CallType
  avatar: string
}

export interface PhoneAppProps {
  isOpen?: boolean
  onClose?: () => void
}
