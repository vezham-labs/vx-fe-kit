import { CalendarApp } from '.'
import { Widget, WidgetContent } from '../../../ui/widget'

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
