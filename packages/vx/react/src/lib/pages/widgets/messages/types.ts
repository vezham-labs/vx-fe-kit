export interface Message {
  id: number
  name: string
  message: string
  time: string
  unread: boolean
  avatar: string
}

export interface MessagesAppProps {
  isOpen?: boolean
  onClose?: () => void
}
