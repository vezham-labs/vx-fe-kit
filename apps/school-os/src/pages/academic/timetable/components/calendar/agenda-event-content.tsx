import { Agenda } from '@vezham/react-pro-v3'
import { Avatar } from '@vezham/react-v3'

import type { TimetableAgendaEvent } from '../../types'
import { getInitials } from '../../utils/timetable'
import { classNames } from '../../variants'

export function AgendaEventContent({ event }: { event: TimetableAgendaEvent }) {
  return (
    <div className={classNames.eventContent}>
      <Agenda.EventTime className={classNames.eventMeta} event={event} />
      <Agenda.EventTitle className={classNames.eventTitle}>
        {event.subject}
      </Agenda.EventTitle>
      <TeacherBadge event={event} />
    </div>
  )
}

export function AgendaAllDayEventContent({
  event
}: {
  event: TimetableAgendaEvent
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5 truncate">
      <TeacherAvatar event={event} className="size-4" />
      <span className="truncate">
        {event.title} · {event.teacher}
      </span>
    </div>
  )
}

export function AgendaMonthEventContent({
  event
}: {
  event: TimetableAgendaEvent
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 leading-tight">
      <span className="line-clamp-2 text-[11px] font-semibold">
        {event.title}
      </span>
      <div className="flex min-w-0 items-center gap-1 text-[10px] opacity-85">
        <TeacherAvatar event={event} className="size-4" />
        <span className="min-w-0 truncate">{event.teacher}</span>
      </div>
    </div>
  )
}

function TeacherBadge({ event }: { event: TimetableAgendaEvent }) {
  return (
    <div className={classNames.eventTeacher}>
      <TeacherAvatar event={event} className="size-4" />
      <span className="truncate">{event.teacher}</span>
    </div>
  )
}

function TeacherAvatar({
  className,
  event
}: {
  className?: string
  event: TimetableAgendaEvent
}) {
  return (
    <Avatar className={`shrink-0 ${className ?? ''}`}>
      {event.teacherAvatar && (
        <Avatar.Image src={event.teacherAvatar} alt={event.teacher} />
      )}
      <Avatar.Fallback>{getInitials(event.teacher)}</Avatar.Fallback>
    </Avatar>
  )
}
