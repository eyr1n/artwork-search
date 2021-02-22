import { Component, Host, h, Prop } from '@stencil/core';
import download from 'downloadjs';

@Component({
  tag: 'app-artworks-item',
  styleUrl: 'app-artworks-item.css',
  shadow: true,
})
export class AppArtworksItem {
  @Prop() url: string;

  isTouchDevice() {
    return 'ontouchstart' in window ? 'touch' : '';
  }

  render() {
    const artworkUrl600 = this.url.replace('100x100', '600x600');
    return (
      <Host>
        <img src={this.url}></img>
        <div class={`overlay ${this.isTouchDevice()}`}>
          <ion-button size="small" href={artworkUrl600} target="_blank">
            <ion-icon slot="icon-only" name="eye"></ion-icon>
          </ion-button>
          <ion-button size="small" onClick={() => download(artworkUrl600)}>
            <ion-icon slot="icon-only" name="cloud-download"></ion-icon>
          </ion-button>
        </div>
        <a class={`touch-overlay ${this.isTouchDevice()}`} href={artworkUrl600} target="_blank"></a>
      </Host>
    );
  }
}
