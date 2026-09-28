import { motion } from 'framer-motion'
import React from 'react'

import {
  FileText as FileTextIcon,
  Paperclip as PaperclipIcon
} from '@vezham/icons-react'
import { Avatar, ScrollShadow } from '@vezham/react-v2'

import { AppView } from '@components/app-view'

import { emails, listItemVariants } from './data'
import type { MailAppProps } from './types'

export function MailApp({ isOpen, onClose }: MailAppProps) {
  const [selectedEmail, setSelectedEmail] = React.useState<number | null>(null)

  const handleEmailClick = (id: number) => {
    setSelectedEmail(id)
  }

  const handleBack = () => {
    if (selectedEmail) {
      setSelectedEmail(null)
    } else {
      onClose()
    }
  }

  const selectedEmailData = emails.find(email => email.id === selectedEmail)

  return (
    <AppView
      showBack
      isOpen={isOpen}
      onClose={handleBack}
      title={selectedEmail ? 'Email' : 'Mail'}>
      <ScrollShadow className="h-full">
        {!selectedEmail ? (
          <div className="py-2">
            {emails.map((email, index) => (
              <motion.div
                key={email.id}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => handleEmailClick(email.id)}
                className={`mx-2 mb-2 cursor-pointer rounded-xl p-3 ${
                  email.unread ? 'bg-white/10' : 'hover:bg-white/5'
                }`}>
                <div className="flex items-start gap-3">
                  <Avatar
                    src={email.avatar}
                    size="sm"
                    className={email.unread ? 'ring-2 ring-blue-500' : ''}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm ${
                          email.unread ? 'font-semibold' : 'text-gray-300'
                        }`}>
                        {email.sender}
                      </p>

                      <span className="text-muted text-xs whitespace-nowrap">
                        {email.time}
                      </span>
                    </div>

                    <p
                      className={`truncate text-sm ${
                        email.unread ? '' : 'text-muted'
                      }`}>
                      {email.subject}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {email.preview}
                    </p>

                    {email.hasAttachment && (
                      <div className="mt-1 flex items-center gap-1">
                        <PaperclipIcon
                          className="text-muted h-3 w-3"
                          size="1em"
                          aria-hidden="true"
                        />
                        <span className="text-muted text-xs">Attachment</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <Avatar src={selectedEmailData?.avatar} size="lg" />
              <div>
                <h3 className="font-semibold">{selectedEmailData?.sender}</h3>
                <p className="text-muted text-sm">{selectedEmailData?.time}</p>
              </div>
            </div>

            <h2 className="mb-3 text-lg">{selectedEmailData?.subject}</h2>

            <p className="text-muted text-sm leading-relaxed">
              {selectedEmailData?.preview}
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              <br />
              Best regards,
              <br />
              {selectedEmailData?.sender}
            </p>

            {selectedEmailData?.hasAttachment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center gap-3 rounded-lg bg-white/10 p-3">
                <FileTextIcon
                  className="text-muted h-5 w-5"
                  size="1em"
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="text-sm">Document.pdf</p>
                  <p className="text-muted text-xs">2.4 MB</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </ScrollShadow>
    </AppView>
  )
}
