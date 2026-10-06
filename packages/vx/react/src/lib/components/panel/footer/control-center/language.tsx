import { Translation } from '@vezham/icons-react'

import { useRootAttribute } from './document'
import { Options } from './options'
import { ActionTile } from './tile'
import type { LanguageAdapter, Option } from './types'

type LanguageContext = { language: LanguageAdapter }

export const LanguageTile = ({
  language,
  onOpen
}: LanguageContext & { onOpen: () => void }) => (
  <ActionTile
    label="Language"
    description={
      language.options.find(option => option.value === language.value)?.label
    }
    icon={<Translation size={18} />}
    onPress={onOpen}
  />
)

export const LanguageSettings = ({ language }: LanguageContext) => (
  <Options {...language} />
)

type DocumentLanguageContext = {
  languageOptions: readonly Option[]
}

export const DocumentLanguageTile = ({
  languageOptions,
  onOpen
}: DocumentLanguageContext & { onOpen: () => void }) => {
  const language = useRootAttribute('lang', 'en')
  return (
    <LanguageTile
      language={{ ...language, options: languageOptions }}
      onOpen={onOpen}
    />
  )
}

export const DocumentLanguageSettings = ({
  languageOptions
}: DocumentLanguageContext) => {
  const language = useRootAttribute('lang', 'en')
  return <Options {...language} options={languageOptions} />
}
