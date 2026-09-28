import { type ComponentPropsWithRef, type ElementType, ReactNode } from 'react'

import { cn } from '@vezham/react-v3'

import { tvProps, tvSlots, tva } from './variant'

interface Props extends tvProps, Omit<ComponentPropsWithRef<'div'>, 'title'> {
  as?: ElementType
  classNames?: Partial<Record<tvSlots, string>>
  isOpen: boolean
  onClose: () => void
  backdrop?: 'transparent' | 'blur' | 'opaque'
  placement?: 'left' | 'right' | 'top' | 'bottom'
  title?: ReactNode
  onEdit?: () => void
  isEmpty?: boolean
}

const useProps = (originalProps: Props) => {
  const {
    variant,
    size,
    blur,
    border,
    as,
    id,
    ref,
    children,
    className,
    classNames,
    isOpen,
    onClose,
    backdrop = 'transparent',
    placement = 'left',
    title = 'Notification Center',
    onEdit,
    isEmpty = false,
    ...otherProps
  } = originalProps

  const Component = as || 'div'
  const domRef = ref
  const slots = tva({ variant, placement, size, blur, border })

  const getDrawerBaseProps = () => ({
    ...otherProps,
    id,
    ref: domRef,
    className: slots.drawer_base({
      class: cn(classNames?.drawer_base, className)
    })
  })

  const getDrawerWrapperProps = () => ({
    className: slots.drawer_wrapper({ class: classNames?.drawer_wrapper })
  })

  const getDrawerContentProps = () => ({
    className: slots.drawer_content({ class: classNames?.drawer_content })
  })

  const getDrawerHeaderProps = () => ({
    className: slots.drawer_header({ class: classNames?.drawer_header })
  })

  const getHeaderTitleProps = () => ({
    className: slots.header_title({ class: classNames?.header_title }),
    children: title
  })

  const closeButtonClassName = slots.close_button({
    class: classNames?.close_button
  })

  const getDrawerBodyProps = () => ({
    className: slots.drawer_body({ class: classNames?.drawer_body })
  })

  const getScrollShadowProps = () => ({
    className: slots.scroll_shadow({ class: classNames?.scroll_shadow }),
    hideScrollBar: true
  })

  const getEmptyStateProps = () => ({
    className: slots.empty_state({ class: classNames?.empty_state })
  })

  const getEmptyStateIconProps = () => ({
    size: 64,
    className: slots.empty_state_icon({
      class: classNames?.empty_state_icon
    })
  })

  const getDrawerFooterProps = () => ({
    className: slots.drawer_footer({ class: classNames?.drawer_footer })
  })

  const getChipProps = () => ({
    className: slots.chip({ class: classNames?.chip }),
    onClick: onEdit
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getDrawerBaseProps,
    getDrawerWrapperProps,
    getDrawerContentProps,
    getDrawerHeaderProps,
    getHeaderTitleProps,
    closeButtonClassName,
    getDrawerBodyProps,
    getScrollShadowProps,
    getEmptyStateProps,
    getEmptyStateIconProps,
    getDrawerFooterProps,
    getChipProps,
    isOpen,
    onClose,
    backdrop,
    placement,
    title,
    onEdit,
    isEmpty
  }
}

export { useProps }
export type { Props }
