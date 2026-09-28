export type EventType = 'meeting' | 'reminder' | 'workout'

export type EventColor = 'primary' | 'success' | 'warning'

export interface Event {
  id: number
  title: string
  time: string
  type: EventType
  color: EventColor
}

export interface CalendarAppProps {
  isOpen?: boolean
  onClose?: () => void
}
