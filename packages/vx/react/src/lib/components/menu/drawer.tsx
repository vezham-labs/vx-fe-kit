import { useEffect, useEffectEvent } from 'react'

import { Close as CloseIcon } from '@vezham/icons-react'
import { Button, Drawer, Typography } from '@vezham/react-v3'

import { AppIcon } from '../app-icon'
import { MenuDrawerProps } from './types'
import {
  getDrawerBodyClasses,
  getDrawerButtonClasses,
  getDrawerCloseButtonClasses,
  getDrawerContentClasses,
  getDrawerGridClasses,
  getDrawerGridItemInnerClasses,
  getDrawerHeaderClasses
} from './variant'

const MenuDrawer = ({
  items,
  selectedKey,
  onItemSelect,
  isOpen,
  onClose,
  isDarkMode = false,
  buttonTextColor
}: MenuDrawerProps) => {
  const closeOnResize = useEffectEvent(() => {
    if (isOpen) onClose()
  })

  useEffect(() => {
    const handleResize = () => closeOnResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Drawer.Backdrop
      isOpen={isOpen}
      onOpenChange={open => !open && onClose()}
      variant="blur"
      className="backdrop-blur-xs">
      <Drawer.Content placement="bottom">
        <Drawer.Dialog className={getDrawerContentClasses({ isDarkMode })}>
          <Drawer.Header className={getDrawerHeaderClasses({ isDarkMode })}>
            <Button
              variant="ghost"
              onPress={onClose}
              className={getDrawerCloseButtonClasses({ isDarkMode })}>
              <CloseIcon className="h-4 w-4" size="1em" aria-hidden="true" />
            </Button>
          </Drawer.Header>
          <Drawer.Body className={getDrawerBodyClasses()}>
            <div className={getDrawerGridClasses()}>
              {items.map(item => (
                <Button
                  variant="ghost"
                  key={item.key}
                  onPress={() => {
                    onItemSelect(item)
                    onClose()
                  }}
                  className={getDrawerButtonClasses({
                    isSelected: selectedKey === item.key,
                    isDarkMode
                  })}>
                  <div
                    className={getDrawerGridItemInnerClasses(
                      buttonTextColor ?? ''
                    )}>
                    {item.icon && (
                      <AppIcon
                        icon={item.icon}
                        className="h-6 w-6"
                        size="1em"
                        aria-hidden="true"
                      />
                    )}
                    <Typography.Paragraph className="text-center">
                      {item.title}
                    </Typography.Paragraph>
                  </div>
                </Button>
              ))}
            </div>
          </Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  )
}

export { MenuDrawer }
