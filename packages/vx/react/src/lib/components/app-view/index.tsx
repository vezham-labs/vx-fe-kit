import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion
} from 'framer-motion'
import { forwardRef } from 'react'

import { AltArrowLeft as AltArrowLeftIcon } from '@vezham/icons-react'

import { Props, useProps } from './types'

const AppView = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const shouldReduceMotion = useReducedMotion()
  const {
    Component,
    slots,
    classNames,
    isOpen,
    onClose,
    title,
    showBack,
    children,
    getBaseProps
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scale: 0.3, opacity: 0, borderRadius: '100%' }
              }
              animate={{
                scale: 1,
                opacity: 1,
                borderRadius: '24px'
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scale: 0.3, opacity: 0, borderRadius: '100%' }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', damping: 25, stiffness: 300 }
              }
              className={slots.base({ class: classNames?.base })}>
              <div
                className={slots.container({ class: classNames?.container })}>
                <div className={slots.header({ class: classNames?.header })}>
                  {showBack && (
                    <m.button
                      type="button"
                      onClick={onClose}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                      className={slots.backButton({
                        class: classNames?.backButton
                      })}>
                      <AltArrowLeftIcon
                        className="h-5 w-5"
                        size="1em"
                        aria-hidden="true"
                      />
                    </m.button>
                  )}
                  <div className={slots.title({ class: classNames?.title })}>
                    {title}
                  </div>
                </div>
                <div className={slots.content({ class: classNames?.content })}>
                  {children}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </Component>
  )
})

AppView.displayName = 'AppView'

export { AppView }
