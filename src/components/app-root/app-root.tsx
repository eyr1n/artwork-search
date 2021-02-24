import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @State() keyword: string;

  setKeyword(e) {
    if (e.key === 'Enter') {
      this.keyword = e.currentTarget.value;
    }
  }

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>ジャケ画探すよ</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-grid fixed>
            <ion-searchbar placeholder="検索" onKeyDown={e => this.setKeyword(e)}></ion-searchbar>
            <app-artworks keyword={this.keyword}></app-artworks>
          </ion-grid>
        </ion-content>
      </ion-app>
    );
  }
}
