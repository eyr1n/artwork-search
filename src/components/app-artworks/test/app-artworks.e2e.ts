import { newE2EPage } from '@stencil/core/testing';

describe('app-artworks', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-artworks></app-artworks>');

    const element = await page.find('app-artworks');
    expect(element).toHaveClass('hydrated');
  });
});
