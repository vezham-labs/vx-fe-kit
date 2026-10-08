import { useNavigate } from '@tanstack/react-router'
import { type ComponentProps, forwardRef, useMemo, useState } from 'react'

import { Bookmark as BookmarkIcon, Star as StarIcon } from '@vezham/icons-react'
import { ScrollShadow, Tooltip, Typography } from '@vezham/react-v3'

import { useBookmarks } from '../../../../store/useBookmarks'
import { getAppPath, getOpenUrl } from '../../../../utils/url'
import { ShortcutTooltipLabel } from '../../../shortcut-key'
import { InfoPanelDefinition, useInfoPanel } from '../../info-panel'
import { BookmarkFileTree } from './bookmark-file-tree'
import {
  collectTreeItemIds,
  createTreeItemId,
  dedupeTreeItems,
  getBookmarkTreeSignature,
  getExpandableBookmarkKeys,
  getUniqueTreeId,
  insertFolderItem,
  moveTreeItemToFolder,
  removeTreeItem,
  updateTreeItem
} from './bookmark-file-tree/variants'
import { FolderModal } from './folder-modal'
import { type FolderFormState } from './folder-modal/types'
import {
  DEFAULT_FOLDER_COLOR,
  DEFAULT_FOLDER_EMOJI,
  DEFAULT_FOLDER_ICON,
  createDefaultFolderForm
} from './folder-modal/variants'
import { useBookmarkMembership } from './membership'
import { QuickAccess } from './quick-access'
import {
  type BookmarkItem,
  type BookmarkTreeItem,
  type FavoriteItem,
  type Props,
  useProps
} from './types'

const getFolderPathFromBookmark = (bookmark: BookmarkItem) => {
  if (bookmark.folderPath?.length) {
    return bookmark.folderPath
  }

  return bookmark.folder?.split('/').filter(Boolean) ?? []
}

const createBookmarkTreeNode = (
  bookmark: BookmarkItem,
  counts: Map<string, number>
): BookmarkTreeItem => ({
  id: getUniqueTreeId(`bookmark:${bookmark.id}`, counts),
  title: bookmark.name,
  kind: 'bookmark',
  bookmark: {
    ...bookmark,
    kind: 'bookmark',
    children: undefined
  }
})

const bookmarksToTreeItems = (bookmarks: BookmarkItem[]) => {
  const treeItems: BookmarkTreeItem[] = []
  const folderByPath = new Map<string, BookmarkTreeItem>()
  const idCounts = new Map<string, number>()

  const ensureFolder = (path: string[]) => {
    let children = treeItems
    let currentFolder: BookmarkTreeItem | undefined
    let currentPath: string[] = []

    path.forEach(folderName => {
      currentPath = [...currentPath, folderName]
      const pathKey = currentPath.join('/')
      const existingFolder = folderByPath.get(pathKey)

      if (existingFolder) {
        currentFolder = existingFolder
        children = existingFolder.children ?? []
        existingFolder.children = children
        return
      }

      const folder: BookmarkTreeItem = {
        id: getUniqueTreeId(`folder:${pathKey}`, idCounts),
        title: folderName,
        kind: 'folder',
        color: DEFAULT_FOLDER_COLOR,
        visualType: 'icon',
        icon: DEFAULT_FOLDER_ICON,
        children: []
      }

      children.push(folder)
      folderByPath.set(pathKey, folder)
      currentFolder = folder
      children = folder.children ?? []
    })

    return currentFolder?.children ?? treeItems
  }

  const appendBookmark = (
    bookmark: BookmarkItem,
    parentPath: string[] = []
  ) => {
    const isFolder =
      bookmark.kind === 'folder' || Boolean(bookmark.children?.length)

    if (isFolder) {
      const folderPath = [...parentPath, bookmark.name]
      ensureFolder(folderPath)
      bookmark.children?.forEach(child => appendBookmark(child, folderPath))

      return
    }

    const folderPath = [...parentPath, ...getFolderPathFromBookmark(bookmark)]
    const children = ensureFolder(folderPath)
    children.push(createBookmarkTreeNode(bookmark, idCounts))
  }

  bookmarks.forEach(bookmark => appendBookmark(bookmark))

  return treeItems
}

const treeItemsToBookmarks = (items: BookmarkTreeItem[]) => {
  const convert = (
    node: BookmarkTreeItem,
    folderPath: string[] = []
  ): BookmarkItem => {
    if (node.kind === 'bookmark' && node.bookmark) {
      return {
        ...node.bookmark,
        folder: folderPath[folderPath.length - 1],
        folderPath,
        children: undefined
      }
    }

    const nextPath = [...folderPath, node.title]

    return {
      id: node.id,
      name: node.title,
      kind: 'folder',
      color: node.color,
      visualType: node.visualType,
      emoji: node.emoji,
      icon: node.icon,
      folder: folderPath[folderPath.length - 1],
      folderPath,
      children: (node.children ?? []).map(child => convert(child, nextPath))
    }
  }

  return items.map(item => convert(item))
}

const useBookmarkItemNavigation = (
  onFavoriteClick: Props['onFavoriteClick'],
  onBookmarkClick: Props['onBookmarkClick']
) => {
  const navigate = useNavigate()

  const openItem = (url: string) => {
    if (!url || url === '#') {
      return
    }

    const appPath = getAppPath(url, window.location.origin)

    if (appPath) {
      navigate({ to: appPath })
      return
    }

    window.open(getOpenUrl(url), '_blank', 'noopener,noreferrer')
  }

  return {
    openBookmark: (url: string, item: BookmarkItem) =>
      onBookmarkClick ? onBookmarkClick(url, item) : openItem(url),
    openFavorite: (url: string, item: FavoriteItem) =>
      onFavoriteClick ? onFavoriteClick(url, item) : openItem(url)
  }
}

const getSavedFolderItems = ({
  items,
  form,
  mode,
  parentId
}: {
  items: BookmarkTreeItem[]
  form: FolderFormState
  mode: 'create' | 'edit'
  parentId?: string
}): BookmarkTreeItem[] | null | undefined => {
  const folderName = form.name.trim()

  if (!folderName) {
    return null
  }

  if (mode === 'edit' && form.id) {
    return updateTreeItem(items, form.id, item => ({
      ...item,
      title: folderName,
      color: form.color,
      visualType: form.visualType,
      emoji: form.emoji,
      icon: form.icon
    }))
  }

  const folder: BookmarkTreeItem = {
    id: createTreeItemId('folder:custom', collectTreeItemIds(items)),
    title: folderName,
    kind: 'folder',
    color: form.color,
    visualType: form.visualType,
    emoji: form.emoji,
    icon: form.icon,
    children: []
  }
  const result = insertFolderItem(items, folder, parentId)

  return result.inserted ? result.items : undefined
}

const BookmarksContent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    Component,
    getScrollShadowProps,
    getContentContainerProps,
    getSectionProps,
    getSectionHeaderProps,
    getSectionIconProps,
    getSectionTitleProps,
    getFavorite2ItemsProps,
    getFavoriteBackgroundImageProps,
    getFavoriteBackgroundGradientProps,
    getFavoriteOverlayProps,
    getFavoriteAvatarContainerProps,
    getFavoriteAvatarProps,
    getFavoriteAvatarIconProps,
    getFavoriteAvatarFallbackProps,
    getFavoriteContentProps,
    getFavoriteNameProps,
    getFileTreeProps,
    getBookmarkTreeEmptyStateProps,
    externalFavorites,
    externalBookmarks,
    externalPins,
    onFavoriteClick,
    onBookmarkClick,
    renderFavoriteItem,
    onFavoritesChange,
    onPinsChange,
    onFavoritesReorder,
    onBookmarksReorder,
    onFolderReorder
  } = useProps({
    ...props,
    ref
  })
  const { openBookmark, openFavorite } = useBookmarkItemNavigation(
    onFavoriteClick,
    onBookmarkClick
  )

  const bookmarksQuery = useBookmarks.list({})
  const searchQuery = ''
  const [internalBookmarks, setInternalBookmarks] = useState<BookmarkItem[]>(
    () => bookmarksQuery.data?.bookmarks ?? []
  )
  const [showAllPinsMode, setShowAllPinsMode] = useState(false)
  const [isScrollFavoritesOpen, setIsScrollFavoritesOpen] = useState(true)
  const [bookmarkTreeItems, setBookmarkTreeItems] = useState<
    BookmarkTreeItem[]
  >(() => bookmarksToTreeItems(bookmarksQuery.data?.bookmarks ?? []))
  const [folderModalOpen, setFolderModalOpen] = useState(false)
  const [folderModalMode, setFolderModalMode] = useState<'create' | 'edit'>(
    'create'
  )
  const [folderParentId, setFolderParentId] = useState<string | undefined>()
  const [folderForm, setFolderForm] = useState<FolderFormState>(() =>
    createDefaultFolderForm()
  )

  const membership = useBookmarkMembership({
    favorites: externalFavorites ?? bookmarksQuery.data.favorites,
    pins: externalPins ?? bookmarksQuery.data.pins,
    onFavoritesChange,
    onPinsChange
  })
  const favorites = membership.favorites
  const bookmarks = externalBookmarks ?? internalBookmarks

  const filteredFavorites = useMemo(
    () =>
      favorites.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [favorites, searchQuery]
  )

  const filteredBookmarks = useMemo(
    () =>
      bookmarks.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [bookmarks, searchQuery]
  )

  const activeBookmarkTreeItems = useMemo(
    () =>
      externalBookmarks
        ? bookmarksToTreeItems(filteredBookmarks)
        : bookmarkTreeItems,
    [bookmarkTreeItems, externalBookmarks, filteredBookmarks]
  )

  const bookmarkTreeExpandedKeys = useMemo(
    () => getExpandableBookmarkKeys(activeBookmarkTreeItems),
    [activeBookmarkTreeItems]
  )

  const bookmarkTreeKey = useMemo(
    () => getBookmarkTreeSignature(activeBookmarkTreeItems),
    [activeBookmarkTreeItems]
  )

  const pins = membership.pins
  const visiblePins = pins.slice(0, 6)
  const hasMorePins = pins.length > 6
  const getFavoriteAvatarIconPropsForIcon =
    getFavoriteAvatarIconProps as unknown as () => ComponentProps<
      typeof StarIcon
    >

  const handleViewAllPins = () => {
    setShowAllPinsMode(true)
  }

  const handleBackToNormalView = () => {
    setShowAllPinsMode(false)
  }

  const toggleScrollFavorites = () => {
    setIsScrollFavoritesOpen(!isScrollFavoritesOpen)
  }

  const handleBookmarkTreeClick = (item: BookmarkItem) => {
    openBookmark(item.url ?? '#', item)
  }

  const handleBookmarkTreeChange = (items: BookmarkTreeItem[]) => {
    const nextItems = dedupeTreeItems(items)
    const nextBookmarks = treeItemsToBookmarks(nextItems)

    setBookmarkTreeItems(nextItems)

    if (!externalBookmarks) {
      setInternalBookmarks(nextBookmarks)
    }

    onBookmarksReorder?.(nextBookmarks)
    onFolderReorder?.(nextBookmarks)
  }

  const handleBookmarkRemove = (id: string) => {
    handleBookmarkTreeChange(removeTreeItem(activeBookmarkTreeItems, id))
  }

  const openCreateFolderModal = (parentId?: string) => {
    setFolderModalMode('create')
    setFolderParentId(parentId)
    setFolderForm(createDefaultFolderForm())
    setFolderModalOpen(true)
  }

  const openEditFolderModal = (item: BookmarkTreeItem) => {
    setFolderModalMode('edit')
    setFolderParentId(undefined)
    setFolderForm({
      id: item.id,
      name: item.title,
      color: item.color ?? DEFAULT_FOLDER_COLOR,
      visualType: item.visualType ?? 'icon',
      emoji: item.emoji ?? DEFAULT_FOLDER_EMOJI,
      icon: item.icon ?? DEFAULT_FOLDER_ICON
    })
    setFolderModalOpen(true)
  }

  const handleFolderSave = () => {
    const nextItems = getSavedFolderItems({
      items: activeBookmarkTreeItems,
      form: folderForm,
      mode: folderModalMode,
      parentId: folderParentId
    })

    if (nextItems === null) {
      return
    }

    if (nextItems) {
      handleBookmarkTreeChange(nextItems)
    }

    setFolderModalOpen(false)
  }

  const handleBookmarkMove = (id: string, targetFolderId?: string) => {
    const result = moveTreeItemToFolder(
      activeBookmarkTreeItems,
      id,
      targetFolderId
    )

    handleBookmarkTreeChange(result.items)
  }

  return (
    <Component className="h-full min-h-0">
      <ScrollShadow {...getScrollShadowProps()}>
        {showAllPinsMode ? (
          <div {...getContentContainerProps()}>
            <QuickAccess
              mode="all"
              favorites={filteredFavorites}
              onUnpin={membership.unpin}
              onFavoriteRemove={membership.removeFavorite}
              onFavoritesReorder={items => {
                membership.reorderFavorites(items)
                onFavoritesReorder?.(items)
              }}
              pins={pins}
              visiblePins={visiblePins}
              hasMorePins={hasMorePins}
              isScrollFavoritesOpen={isScrollFavoritesOpen}
              renderFavoriteItem={renderFavoriteItem}
              getSectionProps={getSectionProps}
              getSectionHeaderProps={getSectionHeaderProps}
              getSectionTitleProps={getSectionTitleProps}
              getFavorite2ItemsProps={getFavorite2ItemsProps}
              getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
              getFavoriteBackgroundGradientProps={
                getFavoriteBackgroundGradientProps
              }
              getFavoriteOverlayProps={getFavoriteOverlayProps}
              getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
              getFavoriteAvatarProps={getFavoriteAvatarProps}
              getFavoriteAvatarIconProps={getFavoriteAvatarIconPropsForIcon}
              getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
              getFavoriteContentProps={getFavoriteContentProps}
              getFavoriteNameProps={getFavoriteNameProps}
              onFavoriteClick={openFavorite}
              onViewAllPins={handleViewAllPins}
              onBackToNormalView={handleBackToNormalView}
              onToggleScrollFavorites={toggleScrollFavorites}
            />
          </div>
        ) : (
          <div {...getContentContainerProps()}>
            <QuickAccess
              mode="sections"
              favorites={filteredFavorites}
              onUnpin={membership.unpin}
              onFavoriteRemove={membership.removeFavorite}
              onFavoritesReorder={items => {
                membership.reorderFavorites(items)
                onFavoritesReorder?.(items)
              }}
              pins={pins}
              visiblePins={visiblePins}
              hasMorePins={hasMorePins}
              isScrollFavoritesOpen={isScrollFavoritesOpen}
              renderFavoriteItem={renderFavoriteItem}
              getSectionProps={getSectionProps}
              getSectionHeaderProps={getSectionHeaderProps}
              getSectionTitleProps={getSectionTitleProps}
              getFavorite2ItemsProps={getFavorite2ItemsProps}
              getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
              getFavoriteBackgroundGradientProps={
                getFavoriteBackgroundGradientProps
              }
              getFavoriteOverlayProps={getFavoriteOverlayProps}
              getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
              getFavoriteAvatarProps={getFavoriteAvatarProps}
              getFavoriteAvatarIconProps={getFavoriteAvatarIconPropsForIcon}
              getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
              getFavoriteContentProps={getFavoriteContentProps}
              getFavoriteNameProps={getFavoriteNameProps}
              onFavoriteClick={openFavorite}
              onViewAllPins={handleViewAllPins}
              onBackToNormalView={handleBackToNormalView}
              onToggleScrollFavorites={toggleScrollFavorites}
            />
            <section {...getSectionProps()}>
              <div {...getSectionHeaderProps()}>
                <BookmarkIcon
                  {...getSectionIconProps('text-primary')}
                  weight="filled"
                  aria-hidden="true"
                />
                <Typography.Heading {...getSectionTitleProps('Bookmarks')} />
              </div>
              <BookmarkFileTree
                key={bookmarkTreeKey}
                items={activeBookmarkTreeItems}
                defaultExpandedKeys={bookmarkTreeExpandedKeys}
                getFileTreeProps={getFileTreeProps}
                getBookmarkTreeEmptyStateProps={getBookmarkTreeEmptyStateProps}
                onBookmarkClick={handleBookmarkTreeClick}
                onBookmarkRemove={handleBookmarkRemove}
                onFolderEdit={openEditFolderModal}
                onFolderDelete={handleBookmarkRemove}
                onNewFolder={openCreateFolderModal}
                onBookmarkMove={handleBookmarkMove}
                onTreeChange={handleBookmarkTreeChange}
              />
            </section>
          </div>
        )}
      </ScrollShadow>
      <FolderModal
        open={folderModalOpen}
        mode={folderModalMode}
        form={folderForm}
        onFormChange={setFolderForm}
        onOpenChange={setFolderModalOpen}
        onSave={handleFolderSave}
      />
    </Component>
  )
})

BookmarksContent.displayName = 'BookmarksContent'

const BookmarksTrigger = () => {
  const { activeInfoPanel, toggleInfoPanel } = useInfoPanel()
  const isActive = activeInfoPanel === 'bookmarks'

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <span aria-label="Bookmarks">
          <StarIcon
            className={isActive ? 'text-muted' : ''}
            weight={isActive ? 'filled' : 'outline'}
            size={20}
            onClick={() => toggleInfoPanel('bookmarks')}
            aria-hidden="true"
          />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">
        <ShortcutTooltipLabel label="Bookmarks" shortcut="Mod ⇧ B" />
      </Tooltip.Content>
    </Tooltip>
  )
}

const BookmarksPanelContent = () => {
  return <BookmarksContent />
}

const bookmarksPanel: InfoPanelDefinition = {
  title: 'Bookmarks',
  scrollable: false,
  content: <BookmarksPanelContent />
}

export { BookmarksTrigger, bookmarksPanel }
