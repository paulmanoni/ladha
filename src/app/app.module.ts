import 'zone.js/dist/zone-patch-rxjs';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from 'ngx-electron';

import { AppComponent } from './app.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PlayerBarComponent } from './components/player-bar/player-bar.component';

import { FileService } from './providers/file-service.service';
import { AppService } from './providers/app.service';
import { PlaybackService } from './providers/playback.service';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeCssPipe } from './pipes/safe-css.pipe';
import { SongListComponent } from './components/song-list/song-list.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { PlaylistSongsComponent } from './components/playlist-songs/playlist-songs.component';
import { SongCollectionComponent } from './components/song-collection/song-collection.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    SideBarComponent,
    MainPageComponent,
    SongListComponent,
    AlbumListComponent,
    ArtistListComponent,
    PlaylistSongsComponent,
    SongCollectionComponent,
    PlayerBarComponent,
    SafeHtmlPipe,
    SafeCssPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, AppService, FileService, PlaybackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
