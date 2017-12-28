import {computed, observable} from "mobx";

class AppState {
  @observable realtime: 'on' | 'off' = 'on';
  @observable record: 'empty' | 'recording' | 'dataReady' = 'empty';
  @observable replay: 'empty' | 'dataReady' | 'playing' | 'pause' = 'empty';
  @observable view: 'simple' | 'record' | 'replay' = 'simple';

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