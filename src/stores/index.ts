import {computed, observable} from "mobx";

export type IRealtimeStates = 'on' | 'off';
export type IRecordStates = 'empty' | 'recording' | 'dataReady';
export type IReplayStates = 'empty' | 'dataReady' | 'playing' | 'pause';
export type IViewStates = 'simple' | 'record' | 'replay';

export interface IAppState {
  realtime: IRealtimeStates;
  record: IRecordStates;
  replay: IReplayStates;
  view: IViewStates;

  enableNavigationLinks: {
    simple: boolean,
    record: boolean,
    replay: boolean
  };

  enableRecordButtons: {
    start: boolean,
    stop: boolean,
    clean: boolean
  };

  enableReplayButtons: {
    load: boolean,
    start: boolean,
    stop: boolean,
    clean: boolean
  };
}

class AppState implements IAppState {
  @observable private _realtime: IRealtimeStates = 'on';
  @observable private _record: IRecordStates = 'empty';
  @observable private _replay: IReplayStates = 'empty';
  @observable private _view: IViewStates = 'simple';

  get realtime(): IRealtimeStates { return this._realtime; }
  set realtime(state: IRealtimeStates) { this._realtime = state; }
  get record(): IRecordStates { return this._record; }
  set record(state: IRecordStates) { this._record = state; }
  get replay(): IReplayStates { return this._replay; }
  set replay(state: IReplayStates) { this._replay = state; }
  get view(): IViewStates { return this._view; }
  set view(state: IViewStates) { this._view = state; }

  @computed get enableNavigationLinks() {
    return {
      simple: (this._replay == 'empty' || this._replay == 'dataReady') && (this._record == 'empty' || this._record == 'dataReady'),
      record: this._replay == 'empty' || this._replay == 'dataReady',
      replay: this._record == 'empty' || this._record == 'dataReady'
    }
  }

  @computed get enableRecordButtons() {
    return {
      start: this._record == 'empty',
      stop: this._record == 'recording',
      clean: this._record == 'dataReady'
    }
  }

  @computed get enableReplayButtons() {
    return {
      load: this._replay == 'empty',
      start: this._replay == 'dataReady',
      stop: this._replay == 'playing',
      clean: this._replay == 'dataReady'
    }
  }
}

const stores = {
  appState: new AppState()
};

export default stores;