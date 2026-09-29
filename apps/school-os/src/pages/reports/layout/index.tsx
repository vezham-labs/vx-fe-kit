import { forwardRef } from 'react'

import { SectionLayout } from '@pages/_shared/section-layout'

import { Props, useProps } from './types'

const ReportsLayoutPage = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <SectionLayout controls={useProps({ ...props, ref })} />
))

ReportsLayoutPage.displayName = 'ReportsLayoutPage'

export default ReportsLayoutPage
