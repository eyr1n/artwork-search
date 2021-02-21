import { Component, h, Prop, State, Watch, JSX } from '@stencil/core';
import { loadingController } from '@ionic/core';
import { saveAs } from 'file-saver';

@Component({
  tag: 'app-artworks',
  styleUrl: 'app-artworks.css',
  shadow: true,
})
export class AppArtworks {
  baseUrl: URL;
  params = {
    country: 'JP',
    media: 'music',
    entity: 'album',
    limit: '50',
    lang: 'ja_jp',
    explicit: 'Yes',
  };

  @Prop() keyword: string;
  @State() artworks: JSX.Element;

  constructor() {
    this.baseUrl = new URL('https://itunes.apple.com/search');
    for (const key in this.params) {
      this.baseUrl.searchParams.append(key, this.params[key]);
    }
  }

  async getFromApi(url) {
    const loading = await loadingController.create({ message: '読み込み中…' });
    loading.present();

    const res = await fetch(url);
    const data = await res.json();

    loading.dismiss();
    return data.results;
  }

  @Watch('keyword')
  async showArtworks() {
    const url = new URL(this.baseUrl.href);
    url.searchParams.append('term', this.keyword);
    const data = await this.getFromApi(url.href);

    this.artworks = data.map(item => {
      const artworkUrl600 = item.artworkUrl100.replace('100x100', '600x600');
      return (
        <div class="artwork">
          <img src={item.artworkUrl100}></img>
          <div class="overlay">
            <ion-button size="small" href={artworkUrl600} target="_blank">
              <ion-icon slot="icon-only" name="eye"></ion-icon>
            </ion-button>
            <ion-button size="small" onClick={() => saveAs(artworkUrl600)}>
              <ion-icon slot="icon-only" name="cloud-download"></ion-icon>
            </ion-button>
          </div>
          <a class="touch-overlay" href={artworkUrl600} target="_blank"></a>
        </div>
      );
    });
  }

  render() {
    return this.artworks;
  }
}
