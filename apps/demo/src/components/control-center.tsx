import { ConfiguredControlCenter, type Option } from '@vx/react/control-center'

import { controlCenter } from '@generated/navigation'

const context: { languageOptions: readonly Option[] } = {
  languageOptions: [
    { value: 'en', label: 'English' },
    { value: 'zh', label: '中文' }
  ]
}

export const DemoControlCenter = () => (
  <ConfiguredControlCenter
    config={controlCenter}
    context={context}
    placement="right bottom"
    preview
  />
)
