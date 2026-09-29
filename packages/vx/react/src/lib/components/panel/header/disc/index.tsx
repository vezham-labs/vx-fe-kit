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
  const {
    Component,
    getTabsProps,
    getTabsListContainerProps,
    getTabsListProps,
    getTabArchiveProps,
    getTabTrashProps,
    getTabIndicatorProps,
    getContainerProps,
    getSearchInputProps,
    getActionsBarProps,
    getClearAllButtonProps,
    getRestoreAllButtonProps,
    getEmptyContainerProps,
    getEmptyIconProps,
    getEmptyTitleProps,
    getEmptyDescriptionProps,
    getItemsContainerProps,
    getDateGroupProps,
    getDateHeaderProps,
    getDateLabelProps,
    getDateDividerProps,
    getItemsListProps,
    getItemProps,
    getItemFaviconProps,
    getItemFallbackIconProps,
    getItemContentProps,
    getItemTitleProps,
    getItemUrlProps,
    getItemActionsProps,
    getUnarchiveButtonProps,
    getRestoreButtonProps,
    getDeleteButtonProps,
    getDeletePermanentButtonProps,
    getActionIconProps,
    externalArchiveItems,
    externalTrashItems,
    onUnarchive,
    onDeleteFromArchive,
    onRestore,
    onDeletePermanently,
    onClearAllArchive,
    onClearAllTrash,
    onRestoreAllTrash,
    onItemClick,
    renderArchiveItem,
    renderTrashItem
  } = useProps({
    ...props,
    ref
  })

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

  const archiveItems = externalArchiveItems || internalArchiveItems
  const trashItems = externalTrashItems || internalTrashItems

  return (
    <Component className="h-full">
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
        <div className="bg-background/95 sticky top-0 z-20 shrink-0 pb-4">
          <Tabs
            variant="primary"
            {...getTabsProps()}
            selectedKey={activeTab}
            onSelectionChange={key => setActiveTab(key as string)}>
            <Tabs.ListContainer {...getTabsListContainerProps()}>
              <Tabs.List {...getTabsListProps()}>
                <Tabs.Tab {...getTabArchiveProps()}>
                  <ArchiveIcon size={18} className="mr-2" aria-hidden="true" />
                  Archive
                  <Tabs.Indicator {...getTabIndicatorProps()} />
                </Tabs.Tab>
                <Tabs.Tab {...getTabTrashProps()}>
                  <TrashBinTrashIcon
                    size={18}
                    className="mr-2"
                    aria-hidden="true"
                  />
                  Trash
                  <Tabs.Indicator {...getTabIndicatorProps()} />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {activeTab === 'archive' ? (
            <Archive
              archiveItems={archiveItems}
              archiveSearch={archiveSearch}
              setArchiveSearch={setArchiveSearch}
              setInternalArchiveItems={setInternalArchiveItems}
              getSearchInputProps={getSearchInputProps}
              getActionsBarProps={getActionsBarProps}
              getClearAllButtonProps={getClearAllButtonProps}
              getContainerProps={getContainerProps}
              getEmptyContainerProps={getEmptyContainerProps}
              getEmptyIconProps={getEmptyIconProps}
              getEmptyTitleProps={getEmptyTitleProps}
              getEmptyDescriptionProps={getEmptyDescriptionProps}
              getItemsContainerProps={getItemsContainerProps}
              getDateGroupProps={getDateGroupProps}
              getDateHeaderProps={getDateHeaderProps}
              getDateLabelProps={getDateLabelProps}
              getDateDividerProps={getDateDividerProps}
              getItemsListProps={getItemsListProps}
              getItemProps={getItemProps}
              getItemFaviconProps={getItemFaviconProps}
              getItemFallbackIconProps={getItemFallbackIconProps}
              getItemContentProps={getItemContentProps}
              getItemTitleProps={getItemTitleProps}
              getItemUrlProps={getItemUrlProps}
              getItemActionsProps={getItemActionsProps}
              getUnarchiveButtonProps={getUnarchiveButtonProps}
              getDeleteButtonProps={getDeleteButtonProps}
              getActionIconProps={getActionIconProps}
              onUnarchive={onUnarchive}
              onDeleteFromArchive={onDeleteFromArchive}
              onClearAllArchive={onClearAllArchive}
              onItemClick={onItemClick}
              renderArchiveItem={renderArchiveItem}
            />
          ) : (
            <Trash
              trashItems={trashItems}
              trashSearch={trashSearch}
              setTrashSearch={setTrashSearch}
              setInternalTrashItems={setInternalTrashItems}
              getSearchInputProps={getSearchInputProps}
              getActionsBarProps={getActionsBarProps}
              getRestoreAllButtonProps={getRestoreAllButtonProps}
              getClearAllButtonProps={getClearAllButtonProps}
              getContainerProps={getContainerProps}
              getEmptyContainerProps={getEmptyContainerProps}
              getEmptyIconProps={getEmptyIconProps}
              getEmptyTitleProps={getEmptyTitleProps}
              getEmptyDescriptionProps={getEmptyDescriptionProps}
              getItemsContainerProps={getItemsContainerProps}
              getDateGroupProps={getDateGroupProps}
              getDateHeaderProps={getDateHeaderProps}
              getDateLabelProps={getDateLabelProps}
              getDateDividerProps={getDateDividerProps}
              getItemsListProps={getItemsListProps}
              getItemProps={getItemProps}
              getItemFaviconProps={getItemFaviconProps}
              getItemFallbackIconProps={getItemFallbackIconProps}
              getItemContentProps={getItemContentProps}
              getItemTitleProps={getItemTitleProps}
              getItemUrlProps={getItemUrlProps}
              getItemActionsProps={getItemActionsProps}
              getRestoreButtonProps={getRestoreButtonProps}
              getDeletePermanentButtonProps={getDeletePermanentButtonProps}
              getActionIconProps={getActionIconProps}
              onRestore={onRestore}
              onDeletePermanently={onDeletePermanently}
              onClearAllTrash={onClearAllTrash}
              onRestoreAllTrash={onRestoreAllTrash}
              renderTrashItem={renderTrashItem}
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

export { discPanel, DiscPanelContent, DiscTrigger, DiskContent }
