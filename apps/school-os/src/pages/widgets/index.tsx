import CalendarAppWidget from '../../pages/widgets/calendar/calendar'
import Mail from '../../pages/widgets/mail/mail'
import Messages from '../../pages/widgets/messages/messages'
import Phone from '../../pages/widgets/phone/phone'

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
