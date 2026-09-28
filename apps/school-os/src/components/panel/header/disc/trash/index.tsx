import type { ChangeEvent } from 'react'

import { EmptyState } from '@vezham/react-pro-v3/empty-state'
import { Button, Input, ScrollShadow, Typography } from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'

import { TrashProps } from './types'
import { trashActions } from './variants'

const SearchInput = Input as any
const ActionButton = Button as any

function Trash(props: TrashProps) {
  const {
    trashItems,
    trashSearch,
    setTrashSearch,
    setInternalTrashItems,
    getSearchInputProps,
    getActionsBarProps,
    getRestoreAllButtonProps,
    getClearAllButtonProps,
    getContainerProps,
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
    getRestoreButtonProps,
    getDeletePermanentButtonProps,
    getActionIconProps,
    onRestore,
    onDeletePermanently,
    onClearAllTrash,
    onRestoreAllTrash,
    renderTrashItem
  } = props

  const filteredTrashItems = trashItems.filter(
    item =>
      item.title.toLowerCase().includes(trashSearch.toLowerCase()) ||
      item.url.toLowerCase().includes(trashSearch.toLowerCase())
  )

  const trashByDate = filteredTrashItems.reduce(
    (acc, item) => {
      const date = item.deletedDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    },
    {} as Record<string, TrashProps['trashItems']>
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

  const handleRestore = (id: string) => {
    if (onRestore) {
      onRestore(id)
    } else {
      setInternalTrashItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleDeletePermanently = (id: string) => {
    if (onDeletePermanently) {
      onDeletePermanently(id)
    } else {
      setInternalTrashItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleClearAllTrash = () => {
    if (onClearAllTrash) {
      onClearAllTrash()
    } else {
      setInternalTrashItems([])
    }
  }

  const handleRestoreAllTrash = () => {
    if (onRestoreAllTrash) {
      onRestoreAllTrash()
    } else {
      setInternalTrashItems([])
    }
  }

  const hasTrashItems = filteredTrashItems.length > 0

  const renderTrashContent = () => {
    if (!hasTrashItems) {
      return (
        <div {...getEmptyContainerProps()}>
          <EmptyState className="rounded-2xl">
            <EmptyState.Media>
              <AppIcon
                {...getEmptyIconProps('solar:trash-bin-trash-linear')}
                size="1em"
                aria-hidden="true"
              />
            </EmptyState.Media>
            <EmptyState.Title>Trash is Empty</EmptyState.Title>
          </EmptyState>
        </div>
      )
    }

    return (
      <div {...getItemsContainerProps()}>
        {Object.entries(trashByDate).map(([date, items]) => (
          <div key={date} {...getDateGroupProps()}>
            <div {...getDateHeaderProps()}>
              <Typography.Paragraph {...getDateLabelProps()}>
                {formatDate(date)}
              </Typography.Paragraph>
              <div {...getDateDividerProps()} />
            </div>

            <div {...getItemsListProps()}>
              {items.map(item => {
                if (renderTrashItem) {
                  return renderTrashItem({
                    item,
                    onAction: action => {
                      if (action === 'restore') handleRestore(item.id)
                      if (action === 'delete') handleDeletePermanently(item.id)
                    }
                  })
                }

                return (
                  <div key={item.id} {...getItemProps()}>
                    {item.favicon ? (
                      <img src={item.favicon} {...getItemFaviconProps()} />
                    ) : (
                      <AppIcon
                        {...getItemFallbackIconProps()}
                        size="1em"
                        aria-hidden="true"
                      />
                    )}

                    <div {...getItemContentProps()}>
                      <Typography.Heading {...getItemTitleProps(item.title)} />
                      <Typography.Paragraph {...getItemUrlProps(item.url)} />
                    </div>

                    <div {...getItemActionsProps()}>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getRestoreButtonProps()}
                        onClick={e => {
                          e.stopPropagation()
                          handleRestore(item.id)
                        }}>
                        <AppIcon
                          {...getActionIconProps(
                            'solar:archive-up-linear',
                            'success'
                          )}
                          size="1em"
                          aria-hidden="true"
                        />
                      </Button>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getDeletePermanentButtonProps()}
                        onClick={e => {
                          e.stopPropagation()
                          handleDeletePermanently(item.id)
                        }}>
                        <AppIcon
                          {...getActionIconProps(
                            'solar:trash-bin-trash-linear',
                            'danger'
                          )}
                          size="1em"
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

  const actions = trashActions.map(action => ({
    ...action,
    props:
      action.type === 'restore'
        ? getRestoreAllButtonProps()
        : getClearAllButtonProps(),
    onPress:
      action.type === 'restore' ? handleRestoreAllTrash : handleClearAllTrash
  }))

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="bg-background/95 sticky top-0 z-10 shrink-0 pb-3">
        <SearchInput
          {...getSearchInputProps(false)}
          value={trashSearch}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTrashSearch(e.target.value)
          }
        />

        {hasTrashItems && actions.length > 0 && (
          <div {...getActionsBarProps(true)}>
            {actions.map(action => (
              <ActionButton
                key={action.type}
                {...action.props}
                onPress={action.onPress}
                startContent={
                  <AppIcon icon={action.icon} size={16} aria-hidden="true" />
                }>
                {action.label}
              </ActionButton>
            ))}
          </div>
        )}
      </div>

      <div {...getContainerProps()}>
        <ScrollShadow hideScrollBar className="h-full">
          {renderTrashContent()}
        </ScrollShadow>
      </div>
    </div>
  )
}

export { Trash }
