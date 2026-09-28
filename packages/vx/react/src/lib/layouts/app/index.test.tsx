import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { AppFrame } from './index'

describe('AppFrame', () => {
  it('renders navigation and content in the shared app frame', () => {
    const markup = renderToStaticMarkup(
      <AppFrame
        navigation={<nav data-testid="navigation">Navigation</nav>}
        className="custom-frame"
        contentClassName="custom-content">
        <section data-testid="content">Content</section>
      </AppFrame>
    )

    expect(markup).toContain('data-vx="app-layout"')
    expect(markup).toContain('data-slot="app-layout-content"')
    expect(markup).toContain('data-testid="navigation"')
    expect(markup).toContain('data-testid="content"')
    expect(markup).toContain('custom-frame')
    expect(markup).toContain('custom-content')
  })
})
