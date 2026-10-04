import { m } from 'framer-motion'
import React from 'react'

import {
  FileText as FileTextIcon,
  Paperclip as PaperclipIcon
} from '@vezham/icons-react'
import { Avatar, ScrollShadow } from '@vezham/react-v3'

import { AppView } from '../../../components/app-view'
import { emails } from './data'
import type { MailAppProps } from './types'

const MailApp = ({ isOpen, onClose }: MailAppProps) => {
  const [selectedEmail, setSelectedEmail] = React.useState<number | null>(null)

  const handleEmailClick = (id: number) => {
    setSelectedEmail(id)
  }

  const handleBack = () => {
    if (selectedEmail) {
      setSelectedEmail(null)
    } else {
      onClose?.()
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
              <m.button
                type="button"
                key={email.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleEmailClick(email.id)}
                className={`mx-2 mb-2 w-[calc(100%-1rem)] cursor-pointer rounded-xl p-3 text-left ${
                  email.unread ? 'bg-white/10' : 'hover:bg-white/5'
                }`}>
                <div className="flex items-start gap-3">
                  <Avatar
                    size="sm"
                    className={email.unread ? 'ring-2 ring-blue-500' : ''}>
                    <Avatar.Image src={email.avatar} alt={email.sender} />
                    <Avatar.Fallback>{email.sender[0]}</Avatar.Fallback>
                  </Avatar>

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
              </m.button>
            ))}
          </div>
        ) : (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <Avatar size="lg">
                <Avatar.Image
                  src={selectedEmailData?.avatar}
                  alt={selectedEmailData?.sender}
                />
                <Avatar.Fallback>
                  {selectedEmailData?.sender[0]}
                </Avatar.Fallback>
              </Avatar>
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
              <m.div
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
              </m.div>
            )}
          </m.div>
        )}
      </ScrollShadow>
    </AppView>
  )
}

export { MailApp }
