import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { forwardRef, useState } from 'react'

import {
  Airbuds as AirbudsIcon,
  AltArrowLeft as AltArrowLeftIcon,
  Bluetooth as BluetoothIcon,
  Copy as CopyIcon,
  Moon as MoonIcon,
  Play as PlayIcon,
  Settings as SettingsIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  Sun as SunIcon,
  VolumeLoud as VolumeLoudIcon,
  WiFi as WiFiIcon,
  Widget2 as Widget2Icon
} from '@vezham/icons-react'
import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import { Button, Chip, CloseButton, Drawer } from '@vezham/react-v3'

import { Props, View, useProps } from './types'

const ControlCenterDrawer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const controls = useProps({
    ...props,
    ref
  })
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
  } = controls
  const drawerBaseProps = getDrawerBaseProps()

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
    <Component {...drawerBaseProps}>
      <LazyMotion features={domAnimation}>
        <Drawer.Backdrop
          isOpen={isOpen}
          onOpenChange={open => !open && onClose()}
          variant={backdrop}
          className={getDrawerWrapperProps().className}>
          <Drawer.Content
            placement={placement}
            className={drawerBaseProps.className}>
            <Drawer.Dialog className={getDrawerContentProps().className}>
              <Drawer.Header {...getDrawerHeaderProps()}>
                <CloseButton
                  className={closeButtonClassName}
                  onPress={onClose}
                />
              </Drawer.Header>

              <m.div {...getMotionContainerProps()}>
                {isEmpty ? (
                  <div {...getEmptyStateProps()}>
                    <EmptyState className="rounded-2xl">
                      <EmptyState.Media>
                        <SettingsIcon
                          {...getEmptyStateIconProps()}
                          weight="outline"
                          aria-hidden="true"
                        />
                      </EmptyState.Media>
                      <EmptyState.Title>
                        Control Center is Empty
                      </EmptyState.Title>
                    </EmptyState>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {renderControlCenterMainView(
                      controls,
                      view,
                      handleViewChange
                    )}

                    {view === 'wifi' && (
                      <m.div key="wifi" {...getSubViewProps()}>
                        <div {...getSubViewHeaderProps()}>
                          <Button
                            aria-label="Back to controls"
                            isIconOnly
                            onPress={goBack}
                            variant="ghost">
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
                      </m.div>
                    )}

                    {view === 'airdrop' && (
                      <m.div key="airdrop" {...getSubViewProps()}>
                        <div {...getSubViewHeaderProps()}>
                          <Button
                            aria-label="Back to controls"
                            isIconOnly
                            onPress={goBack}
                            variant="ghost">
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
                      </m.div>
                    )}
                  </AnimatePresence>
                )}

                {!isEmpty && (
                  <Drawer.Footer {...getDrawerFooterProps()}>
                    <Chip {...getChipProps()}>Edit Controls</Chip>
                  </Drawer.Footer>
                )}
              </m.div>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </LazyMotion>
    </Component>
  )
})

const renderControlCenterMainView = (
  controls: ReturnType<typeof useProps>,
  view: View,
  handleViewChange: (view: View) => void
) => {
  const {
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
    getSliderProgressProps
  } = controls

  return view === 'main' ? (
    <m.div
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
              <WiFiIcon
                {...getTileIconProps()}
                weight="filled"
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
              <BluetoothIcon
                {...getTileIconProps()}
                weight="filled"
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
              <AirbudsIcon
                {...getTileIconProps()}
                weight="filled"
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
            <SkipPreviousIcon
              {...getMediaTileIconProps(22)}
              weight="filled"
              aria-hidden="true"
            />

            <PlayIcon
              {...getMediaTileIconProps(28)}
              weight="filled"
              aria-hidden="true"
            />
            <SkipNextIcon
              {...getMediaTileIconProps(22)}
              weight="filled"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div {...getCircleActionProps({})}>
          <div {...getCircleActionIconWrapperProps()}>
            <Widget2Icon
              {...getCircleActionIconProps()}
              weight="filled"
              aria-hidden="true"
            />
          </div>
        </div>

        <div {...getCircleActionProps({})}>
          <div {...getCircleActionIconWrapperProps()}>
            <CopyIcon
              {...getCircleActionIconProps()}
              weight="filled"
              aria-hidden="true"
            />
          </div>
        </div>

        <div {...getCircleActionProps({ large: true })}>
          <div {...getCircleActionIconWrapperProps()}>
            <MoonIcon
              {...getCircleActionIconProps()}
              weight="filled"
              aria-hidden="true"
            />
          </div>
          <div>
            <div {...getCircleActionLabelProps('Do Not Disturb')} />
            <div {...getCircleActionSubProps('On')} />
          </div>
        </div>
      </div>

      <div {...getSliderProps()}>
        <div {...getSliderHeaderProps()}>
          <SunIcon
            {...getSliderIconProps()}
            weight="filled"
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
          <VolumeLoudIcon
            {...getSliderIconProps()}
            weight="filled"
            aria-hidden="true"
          />
          <span {...getSliderLabelProps('Sound')} />
        </div>
        <div {...getSliderTrackProps()}>
          <div {...getSliderProgressProps(75)} />
        </div>
      </div>
    </m.div>
  ) : null
}

ControlCenterDrawer.displayName = 'ControlCenterDrawer'

export { ControlCenterDrawer }
