import { motion } from 'framer-motion'
import React from 'react'

import {
  AddCircle as AddCircleIcon,
  Calendar as CalendarIcon
} from '@vezham/icons-react'
import { Chip, ScrollShadow } from '@vezham/react-v2'

import { AppIcon } from '@components/app-icon'
import { AppView } from '@components/app-view'

import { dates, events, today } from './data'
import type { CalendarAppProps } from './types'
import { getDateKey, getShortWeekday } from './util'

export const CalendarApp = ({ isOpen, onClose }: CalendarAppProps) => {
  const [selectedDate, setSelectedDate] = React.useState(today)

  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Calendar">
      <ScrollShadow className="h-full">
        <div className="flex flex-col gap-4 p-4">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {dates.map((date, index) => (
              <motion.button
                key={getDateKey(date)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedDate(date)}
                className={`flex min-w-[3rem] flex-col items-center rounded-xl p-2 ${
                  getDateKey(selectedDate) === getDateKey(date)
                    ? 'bg-primary-500'
                    : 'bg-white/5'
                }`}>
                <span className="text-muted text-xs">
                  {getShortWeekday(date)}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </motion.button>
            ))}
          </div>

          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="rounded-lg bg-white/5 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AppIcon
                      icon={
                        event.type === 'meeting'
                          ? 'lucide:users'
                          : event.type === 'workout'
                            ? 'lucide:dumbbell'
                            : 'lucide:bell'
                      }
                      className={`h-4 w-4 text-${event.color}`}
                      size="1em"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">{event.title}</span>
                  </div>
                  <Chip size="sm" color={event.color} variant="flat">
                    {event.time}
                  </Chip>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="text-muted mb-2 text-sm font-medium">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-white/5 p-3 hover:bg-white/10">
                <AddCircleIcon
                  className="text-primary-500 h-5 w-5"
                  size="1em"
                  aria-hidden="true"
                />
                <span className="text-sm">New Event</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-white/5 p-3 hover:bg-white/10">
                <CalendarIcon
                  className="text-primary-500 h-5 w-5"
                  size="1em"
                  aria-hidden="true"
                />
                <span className="text-sm">View Month</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollShadow>
    </AppView>
  )
}
