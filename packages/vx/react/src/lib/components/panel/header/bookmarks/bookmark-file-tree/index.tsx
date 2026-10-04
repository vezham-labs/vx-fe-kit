import React, { useMemo, useState } from 'react'
import { Collection } from 'react-aria-components/Collection'
import { useTreeData } from 'react-aria-components/useTreeData'

import {
  CodeFile,
  Folder,
  FolderOpen,
  TrashBinTrash as TrashBinTrashIcon
} from '@vezham/icons-react'
import { ContextMenu, FileTree, useFileTreeDrag } from '@vezham/react-pro-v3'
import { Avatar, Button, Typography } from '@vezham/react-v3'

import { AppIcon } from '../../../../app-icon'
import {
  BookmarkContextMenuItems,
  BrowserContextMenuItems
} from '../context-menu'
import {
  type BookmarkContextTarget,
  type FolderTarget
} from '../context-menu/types'
import { FolderVisualPreview } from '../folder-modal'
import {
  DEFAULT_FOLDER_COLOR,
  DEFAULT_FOLDER_EMOJI,
  DEFAULT_FOLDER_ICON
} from '../folder-modal/variants'
import {
  type BookmarkItem,
  type BookmarkTreeItem,
  type TreeSelection
} from '../types'
import { type BookmarkFileTreeProps } from './types'
import { collectFolderTargets, moveBookmarkTreeItems } from './variants'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? (
    <FolderOpen size={16} aria-hidden="true" />
  ) : (
    <Folder size={16} aria-hidden="true" />
  )

const BookmarkFileTree = ({
  items,
  defaultExpandedKeys,
  getFileTreeProps,
  getBookmarkTreeEmptyStateProps,
  onBookmarkClick,
  onBookmarkRemove,
  onFolderEdit,
  onFolderDelete,
  onNewFolder,
  onBookmarkMove,
  onTreeChange
}: BookmarkFileTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandedKeys)
  )
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [contextTarget, setContextTarget] = useState<BookmarkContextTarget>({
    type: 'area'
  })

  const bookmarkById = useMemo(() => {
    return items.reduce((acc, item) => {
      const collect = (node: BookmarkTreeItem) => {
        if (node.kind === 'bookmark' && node.bookmark) {
          acc.set(node.id, node.bookmark)
        }

        node.children?.forEach(collect)
      }

      collect(item)
      return acc
    }, new Map<string, BookmarkItem>())
  }, [items])

  const tree = useTreeData<BookmarkTreeItem>({
    getChildren: item => item.children ?? [],
    getKey: item => item.id,
    initialItems: items
  })

  const { dragAndDropHooks } = useFileTreeDrag({
    tree,
    onMove: (
      keys: Set<React.Key>,
      target: { key: React.Key; dropPosition: string }
    ) => {
      const result = moveBookmarkTreeItems(
        items,
        [...keys].map(String),
        String(target.key),
        target.dropPosition
      )

      const { expandedKey } = result

      if (expandedKey) {
        setExpandedKeys(currentKeys => {
          const nextKeys = new Set(currentKeys)
          nextKeys.add(expandedKey)

          return nextKeys
        })
      }

      onTreeChange(result.items, result.expandedKey)
    }
  })

  const folderTargets = useMemo<FolderTarget[]>(
    () => collectFolderTargets(items),
    [items]
  )

  const renderBookmarkIcon = (item: BookmarkTreeItem) => {
    if (item.kind === 'folder') {
      if (item.visualType === 'emoji' && item.emoji) {
        return (
          <FolderVisualPreview
            color={item.color ?? DEFAULT_FOLDER_COLOR}
            visualType="emoji"
            emoji={item.emoji}
            icon={item.icon ?? DEFAULT_FOLDER_ICON}
            className="h-5 w-5 text-sm"
          />
        )
      }

      if (item.visualType === 'icon' && item.icon) {
        return (
          <FolderVisualPreview
            color={item.color ?? DEFAULT_FOLDER_COLOR}
            visualType="icon"
            emoji={item.emoji ?? DEFAULT_FOLDER_EMOJI}
            icon={item.icon}
            className="h-5 w-5 text-sm"
          />
        )
      }

      return folderIcon
    }

    if (item.bookmark?.icon) {
      return <AppIcon icon={item.bookmark.icon} size="1em" aria-hidden="true" />
    }

    if (item.bookmark?.avatar) {
      return (
        <Avatar className="h-5 w-5 shrink-0">
          <Avatar.Image src={item.bookmark.avatar} alt={item.title} />
          <Avatar.Fallback>
            {item.title.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
      )
    }

    return <CodeFile size={16} aria-hidden="true" />
  }

  const handleItemContextMenu = (
    event: React.MouseEvent,
    item: BookmarkTreeItem
  ) => {
    event.stopPropagation()
    setContextTarget({
      type: item.kind,
      item
    })
    setSelectedKeys(new Set([item.id]))
  }

  const handleAreaContextMenu = () => {
    setContextTarget({ type: 'area' })
    setSelectedKeys(new Set())
  }

  const handleSelectionChange = (keys: TreeSelection) => {
    if (keys === 'all') {
      setSelectedKeys(new Set(items.map(item => item.id)))
      return
    }

    setSelectedKeys(new Set([...keys].map(String)))
  }

  const renderTitle = (item: (typeof tree.items)[number]) => (
    <div
      className="group relative flex w-full min-w-0 flex-1 items-center"
      onContextMenu={event => handleItemContextMenu(event, item.value)}>
      <Typography.Paragraph className="min-w-0 flex-1 truncate overflow-hidden">
        {item.value.title}
      </Typography.Paragraph>
      <Button
        isIconOnly
        aria-label={`Remove ${item.value.title}`}
        variant="tertiary"
        className="text-danger text-danger absolute top-1/2 right-0 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        onPress={() => {
          if (item.value.kind === 'folder') {
            onFolderDelete(String(item.key))
            return
          }

          onBookmarkRemove(String(item.key))
        }}>
        <TrashBinTrashIcon size={20} aria-hidden="true" />
      </Button>
    </div>
  )

  const renderItem = (item: (typeof tree.items)[number]) => {
    const isFolder = item.value.kind === 'folder'

    return (
      <FileTree.Item
        className="px-0 py-2"
        icon={renderBookmarkIcon(item.value)}
        id={item.key}
        textValue={item.value.title}
        title={renderTitle(item)}
        onContextMenu={(event: React.MouseEvent) =>
          handleItemContextMenu(event, item.value)
        }>
        {isFolder && (
          <Collection items={item.children ?? []}>
            {renderItem as unknown as React.ReactNode}
          </Collection>
        )}
      </FileTree.Item>
    )
  }

  return (
    <ContextMenu>
      <ContextMenu.Trigger className="block min-h-24">
        <div className="min-h-24" onContextMenu={handleAreaContextMenu}>
          <FileTree
            {...getFileTreeProps()}
            aria-label="Bookmarks file tree"
            dragAndDropHooks={dragAndDropHooks}
            expandedKeys={expandedKeys}
            items={tree.items}
            renderEmptyState={() => (
              <div {...getBookmarkTreeEmptyStateProps()}>No bookmarks</div>
            )}
            selectedKeys={selectedKeys}
            showGuideLines="hover"
            onAction={(key: React.Key) => {
              const bookmark = bookmarkById.get(String(key))

              if (bookmark) {
                onBookmarkClick(bookmark)
              }
            }}
            onExpandedChange={(keys: Iterable<React.Key>) => {
              setExpandedKeys(new Set([...keys].map(String)))
            }}
            onSelectionChange={handleSelectionChange}>
            {renderItem as unknown as React.ReactNode}
          </FileTree>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <BookmarkContextMenuItems
            contextTarget={contextTarget}
            folderTargets={folderTargets}
            onBookmarkRemove={onBookmarkRemove}
            onFolderEdit={onFolderEdit}
            onFolderDelete={onFolderDelete}
            onNewFolder={onNewFolder}
            onBookmarkMove={onBookmarkMove}
          />
        </ContextMenu.Menu>
      </ContextMenu.Popover>
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <BrowserContextMenuItems />
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}

export { BookmarkFileTree }
