import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';

@Injectable()
export class AppService {
  static readonly GO_BACK_PLAYER = 1;
  static readonly GO_BACK_ALBUMS = 2;
  static readonly GO_BACK_ARTISTS = 3;

  appIsMaximized = new Subject<any>();
  hasBack = new Subject<any>();
  goBack = new Subject<any>();
  page = new Subject<any>();
  backstack = [];

  constructor(private _electron: ElectronService,
    private route: Router) {
    var self = this;
    this._electron.ipcRenderer.on("maximize-changed", function(e, newMaxState){
      self.appIsMaximized.next(newMaxState);
    });

    this._electron.ipcRenderer.send("ui-loaded");

    this._electron.ipcRenderer.on("prefs-fetched", function(e, db_prefs){
      try{
        if(db_prefs){
          if(db_prefs.cur_page){
            self.goTo(db_prefs.cur_page, true);
          }
        }
      }catch(e){
        console.log("Couldn't parse prefs!");
        console.log(e);
      }
    });

    this.goBack.subscribe(res => {
      if(!this.backstack.length) this.hasBack.next(true);
    });
  }

  appAction(action){
    console.log(action);
    if(action === -1){
      this.goBack.next(this.backstack[this.backstack.length - 1]);
      this.backstack.pop();
      return;
    }

    this._electron.ipcRenderer.send("app-action", action);
  }

  addBack(sub_page){
    if(!this.backstack.length)
      this.hasBack.next(true);

    this.backstack.push(sub_page);
  }

  goTo(where, fromPrefs=false){
    this.route.navigate([where]);
    this.page.next(where);

    if(!fromPrefs)
      this._electron.ipcRenderer.send("set-pref", "cur_page", where);
  }
}
