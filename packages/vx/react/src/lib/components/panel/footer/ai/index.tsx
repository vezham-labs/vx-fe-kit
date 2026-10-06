import { forwardRef } from 'react'

import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import { Drawer } from '@vezham/react-v3'

import { AppIcon } from '../../../app-icon'
import { InfoPanelDefinition } from '../../info-panel'
import { Props, useProps } from './types'

const AIContent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { Component, getBaseProps, getBodyProps, getIconProps } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <div {...getBodyProps()}>
        <EmptyState className="rounded-2xl">
          <EmptyState.Media>
            <AppIcon {...getIconProps()} size="1em" aria-hidden="true" />
          </EmptyState.Media>
          <EmptyState.Title>Tamizhi AI is Under Dev</EmptyState.Title>
        </EmptyState>
      </div>
    </Component>
  )
})

AIContent.displayName = 'AIContent'

const AIDrawer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    Component,
    getBaseProps,
    getWrapperProps,
    getContentProps,
    isOpen,
    onClose,
    backdrop,
    placement
  } = useProps({
    ...props,
    ref
  })
  const baseProps = getBaseProps()

  return (
    <Component {...baseProps}>
      <Drawer.Backdrop
        isOpen={isOpen}
        onOpenChange={open => !open && onClose()}
        variant={backdrop}
        className={getWrapperProps().className}>
        <Drawer.Content placement={placement} className={baseProps.className}>
          <Drawer.Dialog className={getContentProps().className}>
            <Drawer.Body>
              <AIContent {...props} />
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Component>
  )
})

AIDrawer.displayName = 'AIDrawer'

export const aiPanel: InfoPanelDefinition = {
  title: 'Tamizhi AI',
  content: <AIContent isOpen={false} onClose={() => undefined} />
}
