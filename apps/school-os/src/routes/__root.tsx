import { Outlet, createRootRoute } from '@tanstack/react-router'

import { createRootComponent } from '@vx/start/tanstack'

import { tanstackHead, vxI18n } from '@generated/vx'
import { UserProvider } from '@store/users/useUserStore'

import { AppLayout } from '../layouts/app-layout'

export const Route = createRootRoute({
  head: () => tanstackHead,
  component: createRootComponent({
    lang: vxI18n.defaultLanguage,
    children: (
      <UserProvider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </UserProvider>
    )
  })
})
