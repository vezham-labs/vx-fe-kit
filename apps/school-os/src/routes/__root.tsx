import { Outlet, createRootRoute } from '@tanstack/react-router'

import { createRootComponent } from '@vx/start/tanstack'
import { AppLayout } from '@vx/react/layouts/app'

import { tanstackHead, vxI18n } from '@generated/vx'
import { navigationItems } from '@src/navigation'

export const Route = createRootRoute({
  head: () => tanstackHead,
  component: createRootComponent({
    lang: vxI18n.defaultLanguage,
    children: (
      <AppLayout navigationItems={navigationItems}>
        <Outlet />
      </AppLayout>
    )
  })
})
