import { useNavigate } from '@tanstack/react-router'
import { forwardRef } from 'react'

import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  ScrollShadow
} from '@vezham/react-v2'
import { Chip, CloseButton } from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'
import WidgetsGrid from '@pages/widgets'

import { Props, useProps } from './types'

const NotificationDrawer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    Component,
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
    onEdit,
    isEmpty
  } = useProps({
    ...props,
    ref
  })

  const navigate = useNavigate()

  const handleEdit = () => {
    if (onEdit) {
      onEdit()
    } else {
      navigate({ to: '/widgets' })
    }
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
            <span {...getHeaderTitleProps()} />
            <CloseButton className={closeButtonClassName} onPress={onClose} />
          </DrawerHeader>

          <DrawerBody {...getDrawerBodyProps()}>
            <ScrollShadow {...getScrollShadowProps()}>
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
                    <EmptyState.Title>Notifications are Empty</EmptyState.Title>
                  </EmptyState>
                </div>
              ) : (
                <WidgetsGrid />
              )}
            </ScrollShadow>
          </DrawerBody>

          {!isEmpty && (
            <DrawerFooter {...getDrawerFooterProps()}>
              <Chip variant="primary" {...getChipProps()} onClick={handleEdit}>
                Edit
              </Chip>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </Component>
  )
})

NotificationDrawer.displayName = 'NotificationDrawer'

export { NotificationDrawer }
