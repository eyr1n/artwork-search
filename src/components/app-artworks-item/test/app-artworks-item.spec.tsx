import { newSpecPage } from '@stencil/core/testing';
import { AppArtworksItem } from '../app-artworks-item';

describe('app-artworks-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppArtworksItem],
      html: `<app-artworks-item></app-artworks-item>`,
    });
    expect(page.root).toEqualHtml(`
      <app-artworks-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-artworks-item>
    `);
  });
});
