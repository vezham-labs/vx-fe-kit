import { Document as DocumentIcon } from '@vezham/icons-react'
import { Typography } from '@vezham/react-v3'

import type { useProps } from './types'

type Props = Pick<
  ReturnType<typeof useProps>,
  | 'getItemFaviconProps'
  | 'getItemFallbackIconProps'
  | 'getItemContentProps'
  | 'getItemTitleProps'
  | 'getItemUrlProps'
> & {
  item: { favicon?: string; title: string; url: string }
}

export const StorageHistoryItemContent = ({
  item,
  getItemFaviconProps,
  getItemFallbackIconProps,
  getItemContentProps,
  getItemTitleProps,
  getItemUrlProps
}: Props) => (
  <>
    {item.favicon ? (
      <img src={item.favicon} alt="" {...getItemFaviconProps()} />
    ) : (
      <DocumentIcon
        {...getItemFallbackIconProps()}
        weight="outline"
        aria-hidden="true"
      />
    )}
    <div {...getItemContentProps()}>
      <Typography.Heading {...getItemTitleProps(item.title)} />
      <Typography.Paragraph {...getItemUrlProps(item.url)} />
    </div>
  </>
)
