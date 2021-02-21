import { Component, Host, h, Prop, State, Watch, JSX } from '@stencil/core';
import { loadingController } from '@ionic/core';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import { saveAs } from 'file-saver';

@Component({
  tag: 'app-artworks',
  styleUrl: 'app-artworks.css',
  shadow: true,
})
export class AppArtworks {
  @Prop() keyword: string;
  @State() artworks: JSX.Element;

  async getFromApi(keyword) {
    const loading = await loadingController.create({ message: '読み込み中…' });
    loading.present();

    let res = await axios.get('https://itunes.apple.com/search', {
      adapter: jsonpAdapter,
      params: {
        term: keyword,
        country: 'JP',
        media: 'music',
        entity: 'album',
        limit: '48',
        lang: 'ja_jp',
        explicit: 'Yes',
      },
    });

    loading.dismiss();
    return res.data.results;
  }

  @Watch('keyword')
  async showArtworks() {
    const data = await this.getFromApi(this.keyword);

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
    return (
      <Host>
        {this.artworks}
        {new Array(7).fill(null).map(() => {
          return <div class="dummy"></div>;
        })}
      </Host>
    );
  }
}
