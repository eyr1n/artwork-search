import { Component, h, State, Element } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @Element() el: HTMLElement;
  @State() keyword: string;

  setKeyword() {
    this.keyword = this.el.querySelector('ion-searchbar').value;
  }

  componentDidLoad() {
    this.el.querySelector('ion-searchbar').addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') this.setKeyword();
    });
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
            <ion-searchbar placeholder="検索"></ion-searchbar>
            <app-artworks keyword={this.keyword}></app-artworks>
          </ion-grid>
        </ion-content>
      </ion-app>
    );
  }
}
