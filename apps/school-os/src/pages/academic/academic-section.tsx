import { useEffect } from 'react'

import { Button, Drawer, Input, Label, useOverlayState } from '@vezham/react-v3'

type AcademicSectionPageProps = {
  title: string
  pageKey?: string
  eyebrow?: string
}

export function AcademicSectionPage({
  title,
  pageKey,
  eyebrow = 'Academic'
}: AcademicSectionPageProps) {
  const drawerState = useOverlayState()
  const createTitle = `Add ${title}`

  useEffect(() => {
    if (!pageKey) {
      return
    }

    const openCreateDrawer = () => drawerState.open()
    const eventName = `academic:${pageKey}:create`

    window.addEventListener(eventName, openCreateDrawer)
    return () => window.removeEventListener(eventName, openCreateDrawer)
  }, [drawerState, pageKey])

  return (
    <>
      <section className="space-y-2">
        <p className="text-muted-foreground text-sm">{eyebrow}</p>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </section>

      {pageKey && (
        <Drawer state={drawerState}>
          <Drawer.Backdrop variant="transparent">
            <Drawer.Content placement="right">
              <Drawer.Dialog className="flex h-full w-[min(34rem,100vw)] flex-col bg-white">
                <Drawer.Header className="sticky top-0 z-10 border-b border-[#e8edf6] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="truncate text-lg font-semibold text-[#111827]">
                      {createTitle}
                    </h2>
                    <Button variant="ghost" onPress={drawerState.close}>
                      Close
                    </Button>
                  </div>
                </Drawer.Header>
                <Drawer.Body className="flex-1 px-4 py-4">
                  <div className="space-y-2">
                    <Label>{title} Name</Label>
                    <Input
                      fullWidth
                      placeholder={`Enter ${title.toLowerCase()} name`}
                    />
                  </div>
                </Drawer.Body>
                <Drawer.Footer className="sticky bottom-0 border-t border-[#e8edf6] px-4 py-4">
                  <div className="flex w-full justify-end gap-3">
                    <Button variant="secondary" onPress={drawerState.close}>
                      Cancel
                    </Button>
                    <Button onPress={drawerState.close}>{createTitle}</Button>
                  </div>
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      )}
    </>
  )
}
