import { forwardRef, useState } from 'react'

import {
  Archive as ArchiveIcon,
  TrashBinTrash as TrashBinTrashIcon
} from '@vezham/icons-react'
import { Tabs, Tooltip } from '@vezham/react-v3'

import { useDisc } from '../../../../store/useDisc'
import { InfoPanelDefinition, useInfoPanel } from '../../info-panel'
import { Archive } from './archive'
import { Trash } from './trash'
import { ArchiveItem, Props, TrashItem, useProps } from './types'

const DiskContent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const discProps = useProps({ ...props, ref })
  const { Component } = discProps

  const discQuery = useDisc.list({})
  const [activeTab, setActiveTab] = useState<string>('archive')
  const [archiveSearch, setArchiveSearch] = useState('')
  const [trashSearch, setTrashSearch] = useState('')
  const [internalArchiveItems, setInternalArchiveItems] = useState<
    ArchiveItem[]
  >(() => discQuery.data?.archiveItems ?? [])
  const [internalTrashItems, setInternalTrashItems] = useState<TrashItem[]>(
    () => discQuery.data?.trashItems ?? []
  )

  const archiveItems = discProps.externalArchiveItems || internalArchiveItems
  const trashItems = discProps.externalTrashItems || internalTrashItems

  return (
    <Component className="h-full">
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
        <div className="bg-background/95 sticky top-0 z-20 shrink-0 pb-4">
          <Tabs
            variant="primary"
            {...discProps.getTabsProps()}
            selectedKey={activeTab}
            onSelectionChange={key => setActiveTab(key as string)}>
            <Tabs.ListContainer {...discProps.getTabsListContainerProps()}>
              <Tabs.List {...discProps.getTabsListProps()}>
                <Tabs.Tab {...discProps.getTabArchiveProps()}>
                  <ArchiveIcon size={18} className="mr-2" aria-hidden="true" />
                  Archive
                  <Tabs.Indicator {...discProps.getTabIndicatorProps()} />
                </Tabs.Tab>
                <Tabs.Tab {...discProps.getTabTrashProps()}>
                  <TrashBinTrashIcon
                    size={18}
                    className="mr-2"
                    aria-hidden="true"
                  />
                  Trash
                  <Tabs.Indicator {...discProps.getTabIndicatorProps()} />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {activeTab === 'archive' ? (
            <Archive
              {...discProps}
              archiveItems={archiveItems}
              archiveSearch={archiveSearch}
              setArchiveSearch={setArchiveSearch}
              setInternalArchiveItems={setInternalArchiveItems}
            />
          ) : (
            <Trash
              {...discProps}
              trashItems={trashItems}
              trashSearch={trashSearch}
              setTrashSearch={setTrashSearch}
              setInternalTrashItems={setInternalTrashItems}

              getDeletePermanentButtonProps={
                discProps.getDeletePermanentButtonProps
              }
            />
          )}
        </div>
      </div>
    </Component>
  )
})

DiskContent.displayName = 'DiskContent'

const DiscTrigger = () => {
  const { activeInfoPanel, toggleInfoPanel } = useInfoPanel()
  const isActive = activeInfoPanel === 'disc'

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <span aria-label="Disc">
          <ArchiveIcon
            className={isActive ? 'text-muted' : ''}
            weight={isActive ? 'filled' : 'outline'}
            size={24}
            onClick={() => toggleInfoPanel('disc')}
            aria-hidden="true"
          />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">Disc</Tooltip.Content>
    </Tooltip>
  )
}

const DiscPanelContent = () => {
  return <DiskContent />
}

const discPanel: InfoPanelDefinition = {
  title: 'Disc',
  content: <DiscPanelContent />
}

export { discPanel, DiscTrigger }
