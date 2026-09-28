import { motion } from 'framer-motion'

import { Avatar, ScrollShadow } from '@vezham/react-v2'

import { AppView } from '../../../components/app-view'
import { listItemVariants, messages } from './data'
import type { MessagesAppProps } from './types'

export function MessagesApp({ isOpen, onClose }: MessagesAppProps) {
  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Messages">
      <ScrollShadow className="h-full">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-white/10">
            <div className="relative">
              <Avatar src={message.avatar} size="sm" />

              {message.unread && (
                <motion.div
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{message.name}</p>

                <span className="text-xs text-gray-400">{message.time}</span>
              </div>

              <p className="truncate text-xs text-gray-400">
                {message.message}
              </p>
            </div>
          </motion.div>
        ))}
      </ScrollShadow>
    </AppView>
  )
}
