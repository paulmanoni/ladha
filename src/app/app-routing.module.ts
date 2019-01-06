import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from 'app/components/album-list/album-list.component';
import { SongListComponent } from 'app/components/song-list/song-list.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';

const routes: Routes = [
    {
        path: 'songs',
        component: SongListComponent
    },
    {
        path: 'albums',
        component: AlbumListComponent
    },
    {
        path: 'albums/:id',
        component: AlbumListComponent
    },
    {
        path: 'artists',
        component: ArtistListComponent
    },
    {
        path: 'artists/:id',
        component: ArtistListComponent
    },
    {
        path: '**',
        redirectTo: 'songs'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
