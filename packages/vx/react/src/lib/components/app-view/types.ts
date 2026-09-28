import { type ComponentPropsWithRef, type ElementType, ReactNode } from 'react'

import { cn } from '@vezham/react-v3'

import { tvProps, tvSlots, tva } from './variant'

interface Props extends tvProps, ComponentPropsWithRef<'div'> {
  as?: ElementType
  classNames?: Partial<Record<tvSlots, string>>
  isOpen?: boolean
  onClose?: () => void
  children?: ReactNode
  title?: string
  showBack?: boolean
}

const useProps = (originalProps: Props) => {
  const {
    variant,
    size,
    animation,
    as,
    id,
    ref,
    children,
    className,
    classNames,
    isOpen,
    onClose,
    title,
    showBack = false,
    ...otherProps
  } = originalProps

  const Component = as || 'div'

  const domRef = ref

  const slots = tva({ variant, size, animation })

  const getBaseProps = () => ({
    id,
    ref: domRef,
    className: slots.base({ class: cn(classNames?.base, className) }),
    ...otherProps
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getBaseProps,
    isOpen,
    onClose,
    title,
    showBack
  }
}

export { useProps }
export type { Props }
