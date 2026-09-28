import { type ComponentPropsWithRef, type ElementType, ReactNode } from 'react'

import { cn } from '@vezham/react-v3'

import { tvProps, tvSlots, tva } from './variant'

type View = 'main' | 'airdrop' | 'wifi'

// Sub-component Props
interface TileProps {
  icon: string
  label: string
  sub?: string
  onClick?: () => void
}

interface MediaTileProps {
  status?: string
}

interface CircleActionProps {
  icon: string
  label?: string
  sub?: string
  large?: boolean
}

interface SliderProps {
  label: string
  icon: string
  value?: number
}

interface SubViewProps {
  title: string
  onBack: () => void
  children: ReactNode
}

interface OptionProps {
  label: string
  onClick?: () => void
}

interface Props extends tvProps, ComponentPropsWithRef<'div'> {
  as?: ElementType
  classNames?: Partial<Record<tvSlots, string>>
  isOpen: boolean
  onClose: () => void
  backdrop?: 'transparent' | 'blur' | 'opaque'
  placement?: 'left' | 'right'
  initialView?: View
  onViewChange?: (view: View) => void
  isEmpty?: boolean
}

const useProps = (originalProps: Props) => {
  const {
    variant,
    size,
    blur,
    animation,
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
    initialView = 'main',
    onViewChange,
    isEmpty = false,
    ...otherProps
  } = originalProps

  const Component = as || 'div'
  const domRef = ref
  const slots = tva({ variant, placement, size, blur, animation })

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

  const closeButtonClassName = slots.close_button({
    class: classNames?.close_button
  })

  const getMotionContainerProps = () => ({
    className: slots.motion_container({ class: classNames?.motion_container }),
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 80, opacity: 0 },
    transition: { type: 'spring' as const, stiffness: 320, damping: 28 }
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

  const getMainViewProps = () => ({
    className: slots.main_view({ class: classNames?.main_view })
  })

  const getMainGridProps = () => ({
    className: slots.main_grid({ class: classNames?.main_grid })
  })

  const getMainGridLeftProps = () => ({
    className: slots.main_grid_left({ class: classNames?.main_grid_left })
  })

  const getTileProps = (props?: Pick<TileProps, 'onClick'>) => ({
    className: slots.tile({ class: classNames?.tile }),
    onClick: props?.onClick
  })

  const getTileIconWrapperProps = () => ({
    className: slots.tile_icon_wrapper({ class: classNames?.tile_icon_wrapper })
  })

  const getTileIconProps = () => ({
    size: 20,
    className: slots.tile_icon({ class: classNames?.tile_icon })
  })

  const getTileLabelProps = (label: string) => ({
    className: slots.tile_label({ class: classNames?.tile_label }),
    children: label
  })

  const getTileSubProps = (sub?: string) => ({
    className: slots.tile_sub({ class: classNames?.tile_sub }),
    children: sub
  })

  const getMediaTileProps = () => ({
    className: slots.media_tile({ class: classNames?.media_tile })
  })

  const getMediaTileStatusProps = (status?: string) => ({
    className: slots.media_tile_status({
      class: classNames?.media_tile_status
    }),
    children: status || 'Not Playing'
  })

  const getMediaTileControlsProps = () => ({
    className: slots.media_tile_controls({
      class: classNames?.media_tile_controls
    })
  })

  const getMediaTileIconProps = (size: number) => ({
    size,
    className: slots.media_tile_icon({ class: classNames?.media_tile_icon })
  })

  const getCircleActionProps = (props?: Pick<CircleActionProps, 'large'>) => ({
    className: cn(
      slots.circle_action({ class: classNames?.circle_action }),
      props?.large ? slots.circle_action_large() : slots.circle_action_center()
    )
  })

  const getCircleActionIconWrapperProps = () => ({
    className: slots.circle_action_icon_wrapper({
      class: classNames?.circle_action_icon_wrapper
    })
  })

  const getCircleActionIconProps = () => ({
    size: 20,
    className: slots.circle_action_icon({
      class: classNames?.circle_action_icon
    })
  })

  const getCircleActionLabelProps = (label?: string) => ({
    className: slots.circle_action_label({
      class: classNames?.circle_action_label
    }),
    children: label
  })

  const getCircleActionSubProps = (sub?: string) => ({
    className: slots.circle_action_sub({
      class: classNames?.circle_action_sub
    }),
    children: sub
  })

  const getSliderProps = () => ({
    className: slots.slider({ class: classNames?.slider })
  })

  const getSliderHeaderProps = () => ({
    className: slots.slider_header({ class: classNames?.slider_header })
  })

  const getSliderIconProps = () => ({
    size: 16,
    className: slots.slider_icon({ class: classNames?.slider_icon })
  })

  const getSliderLabelProps = (label: string) => ({
    className: slots.slider_label({ class: classNames?.slider_label }),
    children: label
  })

  const getSliderTrackProps = () => ({
    className: slots.slider_track({ class: classNames?.slider_track })
  })

  const getSliderProgressProps = (value: number) => ({
    className: slots.slider_progress({ class: classNames?.slider_progress }),
    style: { width: `${value}%` }
  })

  const getSubViewProps = () => ({
    className: slots.subview({ class: classNames?.subview }),
    initial: { x: 80, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 80, opacity: 0 }
  })

  const getSubViewHeaderProps = () => ({
    className: slots.subview_header({ class: classNames?.subview_header })
  })

  const getSubViewTitleProps = (title: string) => ({
    className: slots.subview_title({ class: classNames?.subview_title }),
    children: title
  })

  const getSubViewContentProps = () => ({
    className: slots.subview_content({ class: classNames?.subview_content })
  })

  const getOptionProps = (props?: Pick<OptionProps, 'onClick'>) => ({
    className: slots.option({ class: classNames?.option }),
    onClick: props?.onClick
  })

  const getOptionLabelProps = (label: string) => ({
    children: label
  })

  const getDrawerFooterProps = () => ({
    className: slots.drawer_footer({ class: classNames?.drawer_footer })
  })

  const getChipProps = () => ({
    className: slots.chip({ class: classNames?.chip })
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
    closeButtonClassName,
    getMotionContainerProps,
    getEmptyStateProps,
    getEmptyStateIconProps,
    getMainViewProps,
    getMainGridProps,
    getMainGridLeftProps,
    getTileProps,
    getTileIconWrapperProps,
    getTileIconProps,
    getTileLabelProps,
    getTileSubProps,
    getMediaTileProps,
    getMediaTileStatusProps,
    getMediaTileControlsProps,
    getMediaTileIconProps,
    getCircleActionProps,
    getCircleActionIconWrapperProps,
    getCircleActionIconProps,
    getCircleActionLabelProps,
    getCircleActionSubProps,
    getSliderProps,
    getSliderHeaderProps,
    getSliderIconProps,
    getSliderLabelProps,
    getSliderTrackProps,
    getSliderProgressProps,
    getSubViewProps,
    getSubViewHeaderProps,
    getSubViewTitleProps,
    getSubViewContentProps,
    getOptionProps,
    getOptionLabelProps,
    getDrawerFooterProps,
    getChipProps,
    isOpen,
    onClose,
    backdrop,
    placement,
    initialView,
    onViewChange,
    isEmpty
  }
}

export { useProps }
export type {
  Props,
  TileProps,
  MediaTileProps,
  CircleActionProps,
  SliderProps,
  SubViewProps,
  OptionProps,
  View
}
