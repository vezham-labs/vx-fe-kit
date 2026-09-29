import { forwardRef } from 'react'

import { SectionLayout } from '@pages/_shared/section-layout'

import { Props, useProps } from './types'

const AcademicLayoutPage = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <SectionLayout controls={useProps({ ...props, ref })} />
))

AcademicLayoutPage.displayName = 'AcademicLayoutPage'

export default AcademicLayoutPage
