import { Component, Host, h, Prop } from '@stencil/core';
import sanitize from 'sanitize-filename';

@Component({
  tag: 'app-artworks-item',
  styleUrl: 'app-artworks-item.css',
  shadow: true,
})
export class AppArtworksItem {
  @Prop() url: string;
  @Prop() name: string;

  async downloadArtwork(url, name) {
    const res = await fetch(url);
    const blob = await res.blob();

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = sanitize(`${name.slice(0, 30)}.jpg`);
    a.click();
  }

  render() {
    const artworkUrl600 = this.url.replace('100x100', '600x600');
    return (
      <Host>
        <img src={this.url}></img>
        <div class="overlay">
          <ion-button size="small" href={artworkUrl600} target="_blank">
            <ion-icon slot="icon-only" name="eye"></ion-icon>
          </ion-button>
          <ion-button size="small" onClick={() => this.downloadArtwork(artworkUrl600, this.name)}>
            <ion-icon slot="icon-only" name="cloud-download"></ion-icon>
          </ion-button>
        </div>
        <a class="touch-overlay" href={artworkUrl600} target="_blank"></a>
      </Host>
    );
  }
}
