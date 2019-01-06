import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ElectronService } from 'ngx-electron';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { AppService } from '../../providers/app.service';
import { FileService } from '../../providers/file-service.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  folders = [];
  curSong;
  showFolders = false;
  playlists  = false;
  @Input() curPage;

  constructor(private _electron: ElectronService,
    private _files: FileService,
    private _app: AppService,
    private ref:ChangeDetectorRef,
    private route: Router,
    private activeRoute: ActivatedRoute) {
    }

  ngOnInit() {
    var self = this;

    this._files.folders.subscribe(res => {
      this.folders = res;
      this.ref.detectChanges();
    });

    this._app.page.subscribe(res => {
      this.curPage = res;
      this.ref.detectChanges();
    });

    this.activeRoute.params.subscribe(p => {
      console.log("Route changed!");
      console.log(p);
    });
  }

  addFolder(){
    this._files.pickFolder();
  }

  removeFolder(folder){
    this._files.removeFolder(folder);
  }

  toggleShowFolders(){
    this.showFolders = !this.showFolders;
    this.ref.detectChanges();
  }

  goTo(where){
    // console.log(where);
    // this.route.navigate([where]);
    // this.route.navigate(['']);
    this._app.goTo(where);
  }
}
