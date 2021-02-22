import { newE2EPage } from '@stencil/core/testing';

describe('app-artworks-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-artworks-item></app-artworks-item>');

    const element = await page.find('app-artworks-item');
    expect(element).toHaveClass('hydrated');
  });
});
