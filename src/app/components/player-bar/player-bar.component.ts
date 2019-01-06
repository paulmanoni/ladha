import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { PlaybackService } from '../../providers/playback.service';
import { ElectronService } from 'ngx-electron';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent implements OnInit, OnDestroy{
  timeIn = 0;
  duration = 0;
  progress = 0;
  volume = 0;
  muted = false;
  playing = false;
  song = {};
  bgColor = "#555";
  @Input() expanded = false;
  playlist = {
    artwork: "",
    title: "",
    artist: "",
    album: "",
    year: "",
    type: "playlist",
    songs: []
  };
  songs;

  constructor(private _playback: PlaybackService,
    private _app: AppService,
    private _electron: ElectronService,
    private ref: ChangeDetectorRef){
    var self = this;

    this._playback.song.subscribe(res => {
      this.song = res;
      this.playlist.artwork = res.artwork;
      this.playlist.title = res.title;
      this.playlist.artist = res.artist;
      this.playlist.album = res.album;
      this.playlist.year = res.year;
      this.playlist.type = "playlist";

      this._playback.getImageColors(res.artwork.url, 'image/' + res.artwork.mime)
        .then((color: string) => {
          this.bgColor = color;
          console.log("Player bar color: " + this.bgColor);
          ref.detectChanges();
        });
    });

    this._playback.playlist.subscribe(res => {
      this.playlist.songs = res;
      this.playlist.type = "playlist";
      ref.detectChanges();
    });

    this._playback.playing.subscribe(res => {
      this.playing = res;
      ref.detectChanges();
    });

    this._playback.timeIn.subscribe(res => {
      this.timeIn = res;
      this.progress = res / this.duration * 100;
      ref.detectChanges();
    });

    this._playback.duration.subscribe(res => {
      this.duration = res;
      this.progress = this.timeIn / this.duration * 100;
      ref.detectChanges();
    });

    this._playback.muted.subscribe(res => {
      this.muted = res;
      ref.detectChanges();
    });

    this._playback.volume.subscribe(res => {
      this.volume = res*10;
      ref.detectChanges();
    });
  }

  ngOnInit():void{
    // this.playlistClicked();
  }

  playClicked(){
    this._playback.play();
  }

  pauseClicked(){
    this._playback.pause();
  }

  prevClicked(){
    this._playback.playPrevSong();
  }

  nextClicked(){
    this._playback.playNextSong();
  }

  playlistClicked(){
    this._playback.expandPlayer();
    this._app.addBack(AppService.GO_BACK_PLAYER);
  }

  formattedTime(time = 0){
    return this._playback.formattedTime(time);
  }

  ngOnDestroy(): void{
    // this._playback.song.unsubscribe();
    // this._playback.playlist.unsubscribe();
    // this._playback.playing.unsubscribe();
    // this._playback.timeIn.unsubscribe();
    // this._playback.duration.unsubscribe();
    // this._playback.muted.unsubscribe();
    // this._playback.volume.unsubscribe();
  }
}
