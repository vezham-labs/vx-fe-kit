import { Widget, WidgetContent } from '@src/ui/widget'

import { MessagesApp } from '.'

const Messages = () => {
  return (
    <>
      <Widget size="sm">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <MessagesApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Messages
