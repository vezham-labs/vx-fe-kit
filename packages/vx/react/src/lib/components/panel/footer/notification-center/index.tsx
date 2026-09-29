import { useNavigate } from '@tanstack/react-router'
import { forwardRef } from 'react'

import { Bell as BellIcon } from '@vezham/icons-react'
import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import { Chip, CloseButton, Drawer, ScrollShadow } from '@vezham/react-v3'

import { WidgetsGrid } from '../../../../pages/widgets'
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
  const drawerBaseProps = getDrawerBaseProps()

  const navigate = useNavigate()

  const handleEdit = () => {
    if (onEdit) {
      onEdit()
    } else {
      navigate({ to: '/widgets' })
    }
  }

  return (
    <Component {...drawerBaseProps}>
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
              <span {...getHeaderTitleProps()} />
              <CloseButton className={closeButtonClassName} onPress={onClose} />
            </Drawer.Header>

            <Drawer.Body {...getDrawerBodyProps()}>
              <ScrollShadow {...getScrollShadowProps()}>
                {isEmpty ? (
                  <div {...getEmptyStateProps()}>
                    <EmptyState className="rounded-2xl">
                      <EmptyState.Media>
                        <BellIcon
                          {...getEmptyStateIconProps()}
                          weight="outline"
                          aria-hidden="true"
                        />
                      </EmptyState.Media>
                      <EmptyState.Title>
                        Notifications are Empty
                      </EmptyState.Title>
                    </EmptyState>
                  </div>
                ) : (
                  <WidgetsGrid />
                )}
              </ScrollShadow>
            </Drawer.Body>

            {!isEmpty && (
              <Drawer.Footer {...getDrawerFooterProps()}>
                <Chip
                  variant="primary"
                  {...getChipProps()}
                  onClick={handleEdit}>
                  Edit
                </Chip>
              </Drawer.Footer>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Component>
  )
})

NotificationDrawer.displayName = 'NotificationDrawer'

export { NotificationDrawer }
