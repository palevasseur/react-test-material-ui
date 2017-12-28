import * as React from 'react';
import Button from 'material-ui/Button';
import EventsPanel from "./EventsPanel";
import stores from "./stores";
import {observer} from "mobx-react";

/*
Replay: Load / Start / Stop / Options : Reset the cache, Reset subscriptions + Then replay cache, Replay realtime + Overwrite date/time
        Available subscriptions:
        - xxx
        - yyy
Events:
[]Realtime (x) / []Snapshot (x) / []Subscription (x) / []Cache (x) / []Info (x)
 - eee
 - eee
 */

@observer(['appState'])
class ReplayPanel extends React.Component {
  constructor(props:any) {
    super(props);

    stores.appState.view = 'replay';
  }

  load() {
    stores.appState.replay = 'dataReady';
  };

  start() {
    stores.appState.replay = 'playing';
  }

  stop() {
    stores.appState.replay = 'dataReady';
  }

  clean() {
    stores.appState.replay = 'empty';
  }

  render() {
    return (
      <div>
        <div>
          <span className='PaneTitle'>Replay</span>
          <span style={{paddingLeft:'10px'}}>({stores.appState.replay})</span>
        </div>
        <Button onClick={this.load.bind(this)} disabled={!stores.appState.enableReplayButtons.load}>Load</Button>
        <Button onClick={this.start.bind(this)} disabled={!stores.appState.enableReplayButtons.start}>Start</Button>
        <Button onClick={this.stop.bind(this)} disabled={!stores.appState.enableReplayButtons.stop}>Stop</Button>
        <Button onClick={this.clean.bind(this)} disabled={!stores.appState.enableReplayButtons.clean}>Clean</Button>
        <EventsPanel/>
      </div>
    );
  }
}

export default ReplayPanel