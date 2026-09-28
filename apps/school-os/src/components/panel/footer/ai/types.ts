import { type ComponentPropsWithRef, type ElementType, ReactNode } from 'react'

import { cn } from '@vezham/react-v3'

import { tvProps, tvSlots, tva } from './variant'

interface Props extends tvProps, Omit<ComponentPropsWithRef<'div'>, 'title'> {
  as?: ElementType
  classNames?: Partial<Record<tvSlots, string>>
  isOpen: boolean
  onClose: () => void
  icon?: string
  title?: ReactNode
  description?: ReactNode
  backdrop?: 'transparent' | 'blur' | 'opaque'
  placement?: 'left' | 'right' | 'top' | 'bottom'
}

const useProps = (originalProps: Props) => {
  const {
    variant,
    size,
    blur,
    as,
    id,
    ref,
    children,
    className,
    classNames,
    isOpen,
    onClose,
    icon = 'solar:archive-linear',

    backdrop = 'transparent',
    placement = 'left',
    ...otherProps
  } = originalProps

  const Component = as || 'div'
  const domRef = ref
  const slots = tva({ variant, placement, size, blur })

  const getBaseProps = () => ({
    id,
    ref: domRef,
    className: slots.base({ class: cn(classNames?.base, className) }),
    ...otherProps
  })

  const getWrapperProps = () => ({
    className: slots.wrapper({ class: classNames?.wrapper })
  })

  const getContentProps = () => ({
    className: slots.content({ class: classNames?.content })
  })

  const getBodyProps = () => ({
    className: slots.body({ class: classNames?.body })
  })

  const getIconProps = () => ({
    icon,
    width: 64,
    className: slots.icon({ class: classNames?.icon })
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getBaseProps,
    getWrapperProps,
    getContentProps,
    getBodyProps,
    getIconProps,

    isOpen,
    onClose,
    backdrop,
    placement,
    icon
  }
}

export { useProps }
export type { Props }
