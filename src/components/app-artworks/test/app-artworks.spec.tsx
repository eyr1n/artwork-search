import { newSpecPage } from '@stencil/core/testing';
import { AppArtworks } from '../app-artworks';

describe('app-artworks', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppArtworks],
      html: `<app-artworks></app-artworks>`,
    });
    expect(page.root).toEqualHtml(`
      <app-artworks>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-artworks>
    `);
  });
});
