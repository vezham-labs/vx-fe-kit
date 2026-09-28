import {
  type ComponentProps,
  type HTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useState
} from 'react'

import { ScrollShadow, Tooltip, Typography } from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'
import { InfoPanelDefinition, useInfoPanel } from '@components/panel/info-panel'
import { useBookmarks } from '@store/useBookmarks'

import BookmarkFileTree from './bookmark-file-tree'
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
import FolderModal from './folder-modal'
import { type FolderFormState } from './folder-modal/types'
import {
  DEFAULT_FOLDER_COLOR,
  DEFAULT_FOLDER_EMOJI,
  DEFAULT_FOLDER_ICON,
  createDefaultFolderForm
} from './folder-modal/variants'
import QuickAccess from './quick-access'
import {
  areIdsEqual,
  getFavoriteIds,
  orderFavorites,
  reconcileFavoriteOrder
} from './quick-access/variants'
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
    onFavoriteClick,
    onBookmarkClick,
    renderFavoriteItem,
    onBookmarksReorder,
    onFolderReorder
  } = useProps({
    ...props,
    ref
  })

  const bookmarksQuery = useBookmarks.list({})
  const searchQuery = ''
  const [internalFavorites, setInternalFavorites] = useState<FavoriteItem[]>(
    () => bookmarksQuery.data?.favorites ?? []
  )
  const [internalBookmarks, setInternalBookmarks] = useState<BookmarkItem[]>(
    () => bookmarksQuery.data?.bookmarks ?? []
  )
  const [showAllFavoritesMode, setShowAllFavoritesMode] = useState(false)
  const [isScrollFavoritesOpen, setIsScrollFavoritesOpen] = useState(true)
  const [quickAccessOrderIds, setQuickAccessOrderIds] = useState<string[]>(() =>
    getFavoriteIds(bookmarksQuery.data?.favorites ?? [])
  )
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

  useEffect(() => {
    if (!bookmarksQuery.data?.favorites?.length || internalFavorites.length) {
      return
    }

    setInternalFavorites(bookmarksQuery.data.favorites)
    setQuickAccessOrderIds(getFavoriteIds(bookmarksQuery.data.favorites))
  }, [bookmarksQuery.data?.favorites, internalFavorites.length])

  useEffect(() => {
    if (!bookmarksQuery.data?.bookmarks?.length || internalBookmarks.length) {
      return
    }

    setInternalBookmarks(bookmarksQuery.data.bookmarks)
    setBookmarkTreeItems(bookmarksToTreeItems(bookmarksQuery.data.bookmarks))
  }, [bookmarksQuery.data?.bookmarks, internalBookmarks.length])

  const favorites = externalFavorites || internalFavorites
  const bookmarks = externalBookmarks || internalBookmarks

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

  useEffect(() => {
    setQuickAccessOrderIds(currentIds => {
      const nextIds = reconcileFavoriteOrder(currentIds, favorites)

      return areIdsEqual(currentIds, nextIds) ? currentIds : nextIds
    })
  }, [favorites])

  useEffect(() => {
    if (externalBookmarks) {
      setBookmarkTreeItems(bookmarksToTreeItems(filteredBookmarks))
    }
  }, [externalBookmarks, filteredBookmarks])

  const bookmarkTreeExpandedKeys = useMemo(
    () => getExpandableBookmarkKeys(bookmarkTreeItems),
    [bookmarkTreeItems]
  )

  const bookmarkTreeKey = useMemo(
    () => getBookmarkTreeSignature(bookmarkTreeItems),
    [bookmarkTreeItems]
  )

  // Keep the draggable Favorites grid independent from Quick Access order.
  const quickAccessFavorites = orderFavorites(
    filteredFavorites,
    quickAccessOrderIds
  )
  const scrollFavorites = quickAccessFavorites.slice(0, 6)
  const hasMoreFavorites = quickAccessFavorites.length > 6
  const hasFavorites = filteredFavorites.length > 0
  const getSectionIconPropsForIcon = getSectionIconProps as unknown as (
    icon: string,
    className?: string
  ) => ComponentProps<typeof Icon>
  const getSectionTitlePropsForTitle = getSectionTitleProps as unknown as (
    title: string
  ) => HTMLAttributes<HTMLHeadingElement>
  const getFavoriteAvatarIconPropsForIcon =
    getFavoriteAvatarIconProps as unknown as () => ComponentProps<typeof Icon>

  const handleViewAllFavorites = () => {
    setShowAllFavoritesMode(true)
  }

  const handleBackToNormalView = () => {
    setShowAllFavoritesMode(false)
  }

  // Toggle scroll favorites section
  const toggleScrollFavorites = () => {
    setIsScrollFavoritesOpen(!isScrollFavoritesOpen)
  }

  const handleItemClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
    }
  }

  const handleFavoriteClick = (url: string, item: FavoriteItem) => {
    if (onFavoriteClick) {
      onFavoriteClick(url, item)
    } else {
      handleItemClick(url)
    }
  }

  const handleBookmarkClick = (url: string, item: BookmarkItem) => {
    if (onBookmarkClick) {
      onBookmarkClick(url, item)
    } else {
      handleItemClick(url)
    }
  }

  const handleBookmarkTreeClick = (item: BookmarkItem) => {
    handleBookmarkClick(item.url ?? '#', item)
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
    handleBookmarkTreeChange(removeTreeItem(bookmarkTreeItems, id))
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
    const folderName = folderForm.name.trim()

    if (!folderName) {
      return
    }

    if (folderModalMode === 'edit' && folderForm.id) {
      handleBookmarkTreeChange(
        updateTreeItem(bookmarkTreeItems, folderForm.id, item => ({
          ...item,
          title: folderName,
          color: folderForm.color,
          visualType: folderForm.visualType,
          emoji: folderForm.emoji,
          icon: folderForm.icon
        }))
      )
      setFolderModalOpen(false)
      return
    }

    const folder: BookmarkTreeItem = {
      id: createTreeItemId(
        'folder:custom',
        collectTreeItemIds(bookmarkTreeItems)
      ),
      title: folderName,
      kind: 'folder',
      color: folderForm.color,
      visualType: folderForm.visualType,
      emoji: folderForm.emoji,
      icon: folderForm.icon,
      children: []
    }
    const result = insertFolderItem(bookmarkTreeItems, folder, folderParentId)

    if (result.inserted) {
      handleBookmarkTreeChange(result.items)
    }

    setFolderModalOpen(false)
  }

  const handleBookmarkMove = (id: string, targetFolderId?: string) => {
    const result = moveTreeItemToFolder(bookmarkTreeItems, id, targetFolderId)

    handleBookmarkTreeChange(result.items)
  }

  return (
    <Component>
      <ScrollShadow {...getScrollShadowProps()}>
        {showAllFavoritesMode ? (
          <div {...getContentContainerProps()}>
            <QuickAccess
              mode="all"
              quickAccessFavorites={quickAccessFavorites}
              scrollFavorites={scrollFavorites}
              hasMoreFavorites={hasMoreFavorites}
              isScrollFavoritesOpen={isScrollFavoritesOpen}
              renderFavoriteItem={renderFavoriteItem}
              getSectionProps={getSectionProps}
              getSectionHeaderProps={getSectionHeaderProps}
              getSectionTitleProps={getSectionTitlePropsForTitle}
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
              onFavoriteClick={handleFavoriteClick}
              onViewAllFavorites={handleViewAllFavorites}
              onBackToNormalView={handleBackToNormalView}
              onToggleScrollFavorites={toggleScrollFavorites}
            />
          </div>
        ) : (
          <div {...getContentContainerProps()}>
            {hasFavorites && (
              <QuickAccess
                mode="sections"
                quickAccessFavorites={quickAccessFavorites}
                scrollFavorites={scrollFavorites}
                hasMoreFavorites={hasMoreFavorites}
                isScrollFavoritesOpen={isScrollFavoritesOpen}
                renderFavoriteItem={renderFavoriteItem}
                getSectionProps={getSectionProps}
                getSectionHeaderProps={getSectionHeaderProps}
                getSectionTitleProps={getSectionTitlePropsForTitle}
                getFavorite2ItemsProps={getFavorite2ItemsProps}
                getFavoriteBackgroundImageProps={
                  getFavoriteBackgroundImageProps
                }
                getFavoriteBackgroundGradientProps={
                  getFavoriteBackgroundGradientProps
                }
                getFavoriteOverlayProps={getFavoriteOverlayProps}
                getFavoriteAvatarContainerProps={
                  getFavoriteAvatarContainerProps
                }
                getFavoriteAvatarProps={getFavoriteAvatarProps}
                getFavoriteAvatarIconProps={getFavoriteAvatarIconPropsForIcon}
                getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
                getFavoriteContentProps={getFavoriteContentProps}
                getFavoriteNameProps={getFavoriteNameProps}
                onFavoriteClick={handleFavoriteClick}
                onViewAllFavorites={handleViewAllFavorites}
                onBackToNormalView={handleBackToNormalView}
                onToggleScrollFavorites={toggleScrollFavorites}
              />
            )}
            <section {...getSectionProps()}>
              <div {...getSectionHeaderProps()}>
                <AppIcon
                  {...getSectionIconPropsForIcon(
                    'solar:bookmark-bold',
                    'text-primary'
                  )}
                  size="1em"
                  aria-hidden="true"
                />
                <Typography.Heading
                  {...getSectionTitlePropsForTitle('Bookmarks')}
                />
              </div>
              <BookmarkFileTree
                key={bookmarkTreeKey}
                items={bookmarkTreeItems}
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

function BookmarksTrigger() {
  const { activeInfoPanel, toggleInfoPanel } = useInfoPanel()
  const isActive = activeInfoPanel === 'bookmarks'

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <span aria-label="Bookmarks">
          <AppIcon
            className={isActive ? 'text-muted' : ''}
            icon={isActive ? 'solar:star-bold' : 'solar:star-linear'}
            size={24}
            onClick={() => toggleInfoPanel('bookmarks')}
            aria-hidden="true"
          />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">Bookmarks</Tooltip.Content>
    </Tooltip>
  )
}

function BookmarksPanelContent() {
  return <BookmarksContent />
}

const bookmarksPanel: InfoPanelDefinition = {
  title: 'Bookmarks',
  content: <BookmarksPanelContent />
}

export {
  BookmarksContent,
  BookmarksPanelContent,
  BookmarksTrigger,
  bookmarksPanel
}
