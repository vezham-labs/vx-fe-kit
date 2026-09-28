import { Widget, WidgetContent } from '@src/ui/widget'

import { PhoneApp } from '.'

const Phone = () => {
  return (
    <>
      <Widget size="sm">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <PhoneApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Phone
