import { Widget, WidgetContent } from '@src/ui/widget'

import { CalendarApp } from '.'

const CalendarAppWidget = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <CalendarApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default CalendarAppWidget
