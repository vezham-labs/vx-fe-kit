import CalendarAppWidget from './calendar/calendar'
import Mail from './mail/mail'
import Messages from './messages/messages'
import Phone from './phone/phone'

export default function WidgetsGrid() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      <Phone />
      <Messages />
      <Mail />
      <CalendarAppWidget />
    </div>
  )
}
