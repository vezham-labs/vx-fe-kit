import { useNavigate } from '@tanstack/react-router'
import type { ChangeEvent } from 'react'

import {
  Archive as ArchiveIcon,
  ArchiveUp as ArchiveUpIcon,
  Document as DocumentIcon,
  TrashBinTrash as TrashIcon
} from '@vezham/icons-react'
import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import { Button, Input, ScrollShadow, Typography } from '@vezham/react-v3'

import { getAppPath, getOpenUrl } from '../../../../../utils/url'
import { AppIcon } from '../../../../app-icon'
import { ArchiveProps } from './types'
import { archiveActions } from './variants'

const SearchInput = Input
const ActionButton = Button

const Archive = (props: ArchiveProps) => {
  const navigate = useNavigate()
  const {
    archiveItems,
    archiveSearch,
    setArchiveSearch,
    setInternalArchiveItems,
    getSearchInputProps,
    getActionsBarProps,
    getClearAllButtonProps,
    getContainerProps,
    getEmptyContainerProps,
    getEmptyIconProps,
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
    getDeleteButtonProps,
    getActionIconProps,
    onUnarchive,
    onDeleteFromArchive,
    onClearAllArchive,
    onItemClick,
    renderArchiveItem
  } = props

  const filteredArchiveItems = archiveItems.filter(
    item =>
      item.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
      item.url.toLowerCase().includes(archiveSearch.toLowerCase())
  )

  const archiveByDate = filteredArchiveItems.reduce(
    (acc, item) => {
      const date = item.archivedDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    },
    {} as Record<string, ArchiveProps['archiveItems']>
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today'
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
  }

  const handleUnarchive = (id: string) => {
    if (onUnarchive) {
      onUnarchive(id)
    } else {
      setInternalArchiveItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleDeleteFromArchive = (id: string) => {
    if (onDeleteFromArchive) {
      onDeleteFromArchive(id)
    } else {
      setInternalArchiveItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleClearAllArchive = () => {
    if (onClearAllArchive) {
      onClearAllArchive()
    } else {
      setInternalArchiveItems([])
    }
  }

  const handleItemClick = (url: string) => {
    if (onItemClick) {
      onItemClick(url)
    } else if (url && url !== '#') {
      const appPath = getAppPath(url, window.location.origin)

      if (appPath) {
        navigate({ to: appPath })
      } else {
        window.open(getOpenUrl(url), '_blank', 'noopener,noreferrer')
      }
    }
  }

  const hasArchiveItems = filteredArchiveItems.length > 0

  const renderArchiveContent = () => {
    if (!hasArchiveItems) {
      return (
        <div {...getEmptyContainerProps()}>
          <EmptyState className="rounded-2xl">
            <EmptyState.Media>
              <ArchiveIcon
                {...getEmptyIconProps()}
                weight="outline"
                aria-hidden="true"
              />
            </EmptyState.Media>
            <EmptyState.Title>Archive is Empty</EmptyState.Title>
          </EmptyState>
        </div>
      )
    }

    return (
      <div {...getItemsContainerProps()}>
        {Object.entries(archiveByDate).map(([date, items]) => (
          <div key={date} {...getDateGroupProps()}>
            <div {...getDateHeaderProps()}>
              <Typography.Paragraph {...getDateLabelProps()}>
                {formatDate(date)}
              </Typography.Paragraph>
              <div {...getDateDividerProps()} />
            </div>

            <div {...getItemsListProps()}>
              {items.map(item => {
                if (renderArchiveItem) {
                  return renderArchiveItem({
                    item,
                    onAction: action => {
                      if (action === 'unarchive') handleUnarchive(item.id)
                      if (action === 'delete') handleDeleteFromArchive(item.id)
                    }
                  })
                }

                return (
                  <div key={item.id} {...getItemProps()}>
                    <button
                      type="button"
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      onClick={() => handleItemClick(item.url)}>
                      {item.favicon ? (
                        <img
                          src={item.favicon}
                          alt=""
                          {...getItemFaviconProps()}
                        />
                      ) : (
                        <DocumentIcon
                          {...getItemFallbackIconProps()}
                          weight="outline"
                          aria-hidden="true"
                        />
                      )}

                      <div {...getItemContentProps()}>
                        <Typography.Heading
                          {...getItemTitleProps(item.title)}
                        />
                        <Typography.Paragraph {...getItemUrlProps(item.url)} />
                      </div>
                    </button>

                    <div {...getItemActionsProps()}>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getUnarchiveButtonProps()}
                        onPress={() => {
                          handleUnarchive(item.id)
                        }}>
                        <ArchiveUpIcon
                          {...getActionIconProps('default')}
                          weight="outline"
                          aria-hidden="true"
                        />
                      </Button>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getDeleteButtonProps()}
                        onPress={() => {
                          handleDeleteFromArchive(item.id)
                        }}>
                        <TrashIcon
                          {...getActionIconProps('danger')}
                          weight="outline"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const actions = archiveActions.map(action => ({
    ...action,
    props: getClearAllButtonProps(),
    onPress: handleClearAllArchive
  }))

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="bg-background/95 sticky top-0 z-10 shrink-0 pb-3">
        <SearchInput
          {...getSearchInputProps(true)}
          value={archiveSearch}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setArchiveSearch(e.target.value)
          }
        />

        {hasArchiveItems && actions.length > 0 && (
          <div {...getActionsBarProps(false)}>
            {actions.map(action => (
              <ActionButton
                key={action.type}
                {...action.props}
                onPress={action.onPress}>
                <AppIcon icon={action.icon} size={16} aria-hidden="true" />
                {action.label}
              </ActionButton>
            ))}
          </div>
        )}
      </div>

      <div {...getContainerProps()}>
        <ScrollShadow hideScrollBar className="h-full">
          {renderArchiveContent()}
        </ScrollShadow>
      </div>
    </div>
  )
}

export { Archive }
