import { Widget, WidgetContent } from '../../../ui/widget'

import { MailApp } from '.'

const Mail = () => {
  return (
    <>
      <Widget size="md">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <MailApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Mail
