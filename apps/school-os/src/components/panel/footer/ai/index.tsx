import { forwardRef } from 'react'

import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import { Drawer, DrawerBody, DrawerContent } from '@vezham/react-v2'

import { AppIcon } from '@components/app-icon'

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
          <EmptyState.Title>AI is Empty</EmptyState.Title>
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

  return (
    <Component {...getBaseProps()}>
      <Drawer
        backdrop={backdrop}
        placement={placement}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: getBaseProps().className,
          wrapper: getWrapperProps().className
        }}>
        <DrawerContent className={getContentProps().className}>
          <DrawerBody>
            <AIContent {...props} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Component>
  )
})

AIDrawer.displayName = 'AIDrawer'

export const aiPanel: InfoPanelDefinition = {
  title: 'AI',
  content: <AIContent isOpen={false} onClose={() => undefined} />
}

export { AIContent, AIDrawer }
