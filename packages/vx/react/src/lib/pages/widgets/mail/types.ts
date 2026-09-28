export interface Email {
  id: number
  sender: string
  subject: string
  preview: string
  time: string
  unread: boolean
  avatar: string
  hasAttachment: boolean
}

export interface MailAppProps {
  isOpen?: boolean
  onClose?: () => void
}
