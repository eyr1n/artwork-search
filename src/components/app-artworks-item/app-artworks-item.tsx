import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-artworks-item',
  styleUrl: 'app-artworks-item.css',
  shadow: true,
})
export class AppArtworksItem {
  @Prop() url: string;
  @Prop() name: string;

  getFileName(input) {
    const replacements = {
      illegal: [/[\/\?<>\\:\*\|"]/g, ''],
      control: [/[\x00-\x1f\x80-\x9f]/g, ''],
      reserved: [/^\.+$/, ''],
      windowsReserved: [/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, ''],
      windowsTrailing: [/[\. ]+$/, ''],
      space: [/(\s|-)+/g, '_'],
    };

    let output = input;
    for (const key in replacements) {
      output = output.replace.apply(output, replacements[key]);
    }

    return `${output.slice(0, 40)}.jpg`;
  }

  async downloadArtwork(url, name) {
    const res = await fetch(url);
    const blob = await res.blob();

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = this.getFileName(name);
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
