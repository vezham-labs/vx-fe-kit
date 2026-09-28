import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef, useState } from 'react'

import { AltArrowLeft as AltArrowLeftIcon } from '@vezham/icons-react'
import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from '@vezham/react-v2'
import { Button, Chip, CloseButton } from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'

import { Props, View, useProps } from './types'

const ControlCenterDrawer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    Component,
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
  } = useProps({
    ...props,
    ref
  })

  const [view, setView] = useState<View>(initialView)

  const goBack = () => {
    setView('main')
    onViewChange?.('main')
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
    onViewChange?.(newView)
  }

  return (
    <Component {...getDrawerBaseProps()}>
      <Drawer
        backdrop={backdrop}
        hideCloseButton
        placement={placement}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: getDrawerBaseProps().className,
          wrapper: getDrawerWrapperProps().className
        }}>
        <DrawerContent className={getDrawerContentProps().className}>
          <DrawerHeader {...getDrawerHeaderProps()}>
            <CloseButton className={closeButtonClassName} onPress={onClose} />
          </DrawerHeader>

          <motion.div {...getMotionContainerProps()}>
            {isEmpty ? (
              <div {...getEmptyStateProps()}>
                <EmptyState className="rounded-2xl">
                  <EmptyState.Media>
                    <AppIcon
                      {...getEmptyStateIconProps()}
                      size="1em"
                      aria-hidden="true"
                    />
                  </EmptyState.Media>
                  <EmptyState.Title>Control Center is Empty</EmptyState.Title>
                </EmptyState>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {view === 'main' && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    {...getMainViewProps()}>
                    <div {...getMainGridProps()}>
                      <div {...getMainGridLeftProps()}>
                        <div
                          {...getTileProps({
                            onClick: () => handleViewChange('wifi')
                          })}>
                          <div {...getTileIconWrapperProps()}>
                            <AppIcon
                              {...getTileIconProps('mdi:wifi')}
                              size="1em"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <div {...getTileLabelProps('Wi-Fi')} />
                            <div {...getTileSubProps('iPhone')} />
                          </div>
                        </div>

                        <div {...getTileProps({})}>
                          <div {...getTileIconWrapperProps()}>
                            <AppIcon
                              {...getTileIconProps('solar:bluetooth-bold')}
                              size="1em"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <div {...getTileLabelProps('Bluetooth')} />
                            <div {...getTileSubProps('On')} />
                          </div>
                        </div>

                        <div
                          {...getTileProps({
                            onClick: () => handleViewChange('airdrop')
                          })}>
                          <div {...getTileIconWrapperProps()}>
                            <AppIcon
                              {...getTileIconProps('solar:airbuds-bold')}
                              size="1em"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <div {...getTileLabelProps('AirDrop')} />
                            <div {...getTileSubProps('Contacts Only')} />
                          </div>
                        </div>
                      </div>

                      <div {...getMediaTileProps()}>
                        <div {...getMediaTileStatusProps()} />
                        <div {...getMediaTileControlsProps()}>
                          <AppIcon
                            {...getMediaTileIconProps('mdi:skip-previous', 22)}
                            size="1em"
                            aria-hidden="true"
                          />

                          <AppIcon
                            {...getMediaTileIconProps('solar:play-bold', 28)}
                            size="1em"
                            aria-hidden="true"
                          />
                          <AppIcon
                            {...getMediaTileIconProps('mdi:skip-next', 22)}
                            size="1em"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div {...getCircleActionProps({})}>
                        <div {...getCircleActionIconWrapperProps()}>
                          <AppIcon
                            {...getCircleActionIconProps('solar:widget-2-bold')}
                            size="1em"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div {...getCircleActionProps({})}>
                        <div {...getCircleActionIconWrapperProps()}>
                          <AppIcon
                            {...getCircleActionIconProps('solar:copy-bold')}
                            size="1em"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div {...getCircleActionProps({ large: true })}>
                        <div {...getCircleActionIconWrapperProps()}>
                          <AppIcon
                            {...getCircleActionIconProps('solar:moon-bold')}
                            size="1em"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <div
                            {...getCircleActionLabelProps('Do Not Disturb')}
                          />
                          <div {...getCircleActionSubProps('On')} />
                        </div>
                      </div>
                    </div>

                    <div {...getSliderProps()}>
                      <div {...getSliderHeaderProps()}>
                        <AppIcon
                          {...getSliderIconProps('solar:sun-bold')}
                          size="1em"
                          aria-hidden="true"
                        />
                        <span {...getSliderLabelProps('Display')} />
                      </div>
                      <div {...getSliderTrackProps()}>
                        <div {...getSliderProgressProps(50)} />
                      </div>
                    </div>

                    <div {...getSliderProps()}>
                      <div {...getSliderHeaderProps()}>
                        <AppIcon
                          {...getSliderIconProps('solar:volume-loud-bold')}
                          size="1em"
                          aria-hidden="true"
                        />
                        <span {...getSliderLabelProps('Sound')} />
                      </div>
                      <div {...getSliderTrackProps()}>
                        <div {...getSliderProgressProps(75)} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'wifi' && (
                  <motion.div key="wifi" {...getSubViewProps()}>
                    <div {...getSubViewHeaderProps()}>
                      <Button isIconOnly onClick={goBack} variant="ghost">
                        <AltArrowLeftIcon size="1em" aria-hidden="true" />
                      </Button>
                      <div {...getSubViewTitleProps('Wi-Fi')} />
                    </div>

                    <div {...getSubViewContentProps()}>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('iPhone')} />
                      </div>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('Office WiFi')} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'airdrop' && (
                  <motion.div key="airdrop" {...getSubViewProps()}>
                    <div {...getSubViewHeaderProps()}>
                      <Button isIconOnly onClick={goBack} variant="ghost">
                        <AltArrowLeftIcon size="1em" aria-hidden="true" />
                      </Button>
                      <div {...getSubViewTitleProps('AirDrop')} />
                    </div>

                    <div {...getSubViewContentProps()}>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('Contacts Only')} />
                      </div>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('Everyone')} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {!isEmpty && (
              <DrawerFooter {...getDrawerFooterProps()}>
                <Chip {...getChipProps()}>Edit Controls</Chip>
              </DrawerFooter>
            )}
          </motion.div>
        </DrawerContent>
      </Drawer>
    </Component>
  )
})

ControlCenterDrawer.displayName = 'ControlCenterDrawer'

export { ControlCenterDrawer }
