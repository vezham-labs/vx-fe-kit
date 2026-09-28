import { MessagesApp } from '.'
import { Widget, WidgetContent } from '../../../ui/widget'

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
