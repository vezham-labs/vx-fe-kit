import * as React from 'react'

import { Surface, type VariantProps, cn, tv } from '@vezham/react-v3'

const widgetVariants = tv({
  base: 'border-default-200 relative flex flex-col rounded-3xl border border-2 whitespace-nowrap shadow-md',
  variants: {
    size: {
      sm: 'size-48',
      md: 'h-48 w-96',
      lg: 'size-96'
    },
    design: {
      default: 'p-4',
      mumbai: 'p-4'
    },
    variant: {
      default: 'text-foreground bg-white/30',
      secondary: 'bg-secondary text-secondary-foreground'
    }
  },
  defaultVariants: {
    size: 'sm',
    design: 'default',
    variant: 'default'
  }
})

export interface WidgetProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {}

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, size, design, variant, children, ...props }, ref) => (
    <Surface
      variant="transparent"
      ref={ref}
      className={cn(widgetVariants({ size, design, variant }), className)}
      {...props}>
      {children}
    </Surface>
  )
)

Widget.displayName = 'Widget'

const WidgetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-semibold flex flex-none justify-between', className)}
    {...props}
  />
))

WidgetHeader.displayName = 'WidgetHeader'

const WidgetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('leading-none font-semibold tracking-tight', className)}
    {...props}
  />
))

WidgetTitle.displayName = 'WidgetTitle'

const WidgetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-1', className)} {...props} />
))

WidgetContent.displayName = 'WidgetContent'

const WidgetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-none items-center justify-between', className)}
    {...props}
  />
))

WidgetFooter.displayName = 'WidgetFooter'

export {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle,
  widgetVariants
}
