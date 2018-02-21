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

class AppState implements IAppState{
  @observable realtime: IRealtimeStates = 'on';
  @observable record: IRecordStates = 'empty';
  @observable replay: IReplayStates = 'empty';
  @observable view: IViewStates = 'simple';

  @computed get enableNavigationLinks() {
    return {
      simple: (this.replay == 'empty' || this.replay == 'dataReady') && (this.record == 'empty' || this.record == 'dataReady'),
      record: this.replay == 'empty' || this.replay == 'dataReady',
      replay: this.record == 'empty' || this.record == 'dataReady'
    }
  }

  @computed get enableRecordButtons() {
    return {
      start: this.record == 'empty',
      stop: this.record == 'recording',
      clean: this.record == 'dataReady'
    }
  }

  @computed get enableReplayButtons() {
    return {
      load: this.replay == 'empty',
      start: this.replay == 'dataReady',
      stop: this.replay == 'playing',
      clean: this.replay == 'dataReady'
    }
  }
}

const stores = {
  appState: new AppState()
};

export default stores;