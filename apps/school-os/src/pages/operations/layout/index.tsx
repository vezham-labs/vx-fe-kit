import { forwardRef } from 'react'

import { SectionLayout } from '@pages/_shared/section-layout'

import { Props, useProps } from './types'

const OperationsLayoutPage = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <SectionLayout controls={useProps({ ...props, ref })} />
))

OperationsLayoutPage.displayName = 'OperationsLayoutPage'

export default OperationsLayoutPage
