import { motion } from 'framer-motion'

import {
  CallDropped as CallDroppedIcon,
  IncomingCall as IncomingCallIcon,
  OutgoingCall as OutgoingCallIcon,
  Phone as PhoneIcon
} from '@vezham/icons-react'
import { Avatar, ScrollShadow } from '@vezham/react-v3'

import { AppView } from '@components/app-view'

import { recentCalls } from './data'
import type { PhoneAppProps } from './types'

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1
    }
  })
}

export function PhoneApp({ isOpen, onClose }: PhoneAppProps) {
  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Phone">
      <ScrollShadow className="h-full py-2">
        {recentCalls.map((call, index) => (
          <motion.div
            key={`${call.name}-${index}`}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-white/10">
            <Avatar size="sm">
              <Avatar.Image src={call.avatar} alt={call.name} />
              <Avatar.Fallback>{call.name[0]}</Avatar.Fallback>
            </Avatar>

            <div className="flex-1">
              <p className="text-sm font-medium">{call.name}</p>

              <div className="flex items-center gap-1 text-xs text-gray-400">
                {call.type === 'incoming' ? (
                  <IncomingCallIcon size="1em" aria-hidden="true" />
                ) : call.type === 'outgoing' ? (
                  <OutgoingCallIcon size="1em" aria-hidden="true" />
                ) : (
                  <CallDroppedIcon
                    className="text-red-500"
                    size="1em"
                    aria-hidden="true"
                  />
                )}
                <span>{call.time}</span>
              </div>
            </div>

            <PhoneIcon
              className="text-green-500"
              size="1em"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </ScrollShadow>
    </AppView>
  )
}
