import { Outlet, createRootRoute } from '@tanstack/react-router'

import { createRootComponent } from '@vx/start/tanstack'

import { tanstackHead, vxI18n } from '@generated/vx'
import { AppLayout } from '@src/layouts/app-layout'
import { UserProvider } from '@store/users/useUserStore'

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
