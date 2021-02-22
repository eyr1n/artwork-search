import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { loadingController } from '@ionic/core';
import { nanoid } from 'nanoid';

@Component({
  tag: 'app-artworks',
  styleUrl: 'app-artworks.css',
  shadow: true,
})
export class AppArtworks {
  private baseUrl: URL;
  private params = {
    country: 'JP',
    entity: 'album',
    limit: '48',
  };

  @Prop() keyword: string;
  @State() data = [];

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
    url.searchParams.append('_', nanoid(8));
    this.data = await this.getFromApi(url.href);
  }

  render() {
    return (
      <Host>
        {this.data.map(item => {
          return <app-artworks-item url={item.artworkUrl100}></app-artworks-item>;
        })}
        <div class="dummy"></div>
        <div class="dummy"></div>
        <div class="dummy"></div>
        <div class="dummy"></div>
        <div class="dummy"></div>
        <div class="dummy"></div>
        <div class="dummy"></div>
      </Host>
    );
  }
}
