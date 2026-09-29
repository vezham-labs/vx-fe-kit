import type { ReactNode } from 'react'

import { SearchField } from '@vezham/react-v3'

type HeaderProps = {
  actions: ReactNode
  actionsClassName: string
  eyebrow: string
  headerClassName: string
  mutedTextClassName: string
  title: string
  titleClassName: string
}

export const AcademicToolbarHeader = ({
  actions,
  actionsClassName,
  eyebrow,
  headerClassName,
  mutedTextClassName,
  title,
  titleClassName
}: HeaderProps) => (
  <div className={headerClassName}>
    <div>
      <p className={mutedTextClassName}>{eyebrow}</p>
      <h1 className={titleClassName}>{title}</h1>
    </div>
    <div className={actionsClassName}>{actions}</div>
  </div>
)

type SearchProps = {
  ariaLabel: string
  className: string
  value: string
  alignEnd?: boolean
  onChange: (value: string) => void
}

export const AcademicToolbarSearch = ({
  ariaLabel,
  className,
  value,
  alignEnd = false,
  onChange
}: SearchProps) => (
  <div className={className}>
    <div className={alignEnd ? 'ml-auto' : undefined}>
      <SearchField aria-label={ariaLabel} value={value} onChange={onChange}>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search" />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
    </div>
  </div>
)
