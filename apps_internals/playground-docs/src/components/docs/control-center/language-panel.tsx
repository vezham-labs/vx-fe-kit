import { Link } from '@tanstack/react-router'

import { Translation } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

import { getLanguageDisplayName } from '@vx/start/tanstack-docs'

import { i18n } from '@app/docs'
import {
  controlCenterTileVariants,
  controlCenterVariants,
  optionTileVariants
} from '@components/docs/control-center.variants'
import type { Locale } from '@generated/vx'

const styles = controlCenterVariants()
const tile = controlCenterTileVariants()

const languages = i18n.languages.map(locale => ({
  locale,
  title: getLanguageDisplayName(locale)
}))

type Props = {
  locale: Locale
  page: string
  platform: 'web' | 'native'
}

export const LanguagePanel = ({
  locale,
  onOpen
}: Pick<Props, 'locale'> & { onOpen: () => void }) => (
  <Button className={tile.button()} variant="ghost" onPress={onOpen}>
    <span className={tile.content()}>
      <span className={tile.icon()}>
        <Translation size={18} />
      </span>
      <span className={tile.text()}>
        <span className={tile.title()}>Language</span>
        <span className={tile.description()}>
          {languages.find(item => item.locale === locale)?.title}
        </span>
      </span>
    </span>
  </Button>
)

export const LanguageSettings = ({ locale, page, platform }: Props) => (
  <div className={styles.languageList()}>
    {languages.map(item => (
      <Link
        key={item.locale}
        to="/{-$lang}/ui-notebook-platform/$platform/$"
        params={{
          lang: item.locale === i18n.defaultLanguage ? undefined : item.locale,
          platform,
          _splat: page
        }}
        className={optionTileVariants({
          selected: item.locale === locale
        })}>
        {item.title}
      </Link>
    ))}
  </div>
)
