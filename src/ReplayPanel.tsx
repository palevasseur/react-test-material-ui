import * as React from 'react';
import Button from 'material-ui/Button';
import EventsPanel from "./EventsPanel";
import {IAppState} from "./stores";
import {inject, observer} from "mobx-react";

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

@inject("appState")
@observer
class ReplayPanel extends React.Component<{appState:IAppState}> {
  private gs: IAppState;

  constructor(props: {appState:IAppState}) {
    super(props);
    this.gs = props.appState;
  }

  componentDidMount() {
    this.gs.view = 'replay';
  }

  load() {
    this.gs.replay = 'dataReady';
  };

  start() {
    this.gs.replay = 'playing';
  }

  stop() {
    this.gs.replay = 'dataReady';
  }

  clean() {
    this.gs.replay = 'empty';
  }

  render() {
    return (
      <div>
        <div>
          <span className='PaneTitle'>Replay</span>
          <span style={{paddingLeft:'10px'}}>({this.gs.replay})</span>
        </div>
        <Button onClick={this.load.bind(this)} disabled={!this.gs.enableReplayButtons.load}>Load</Button>
        <Button onClick={this.start.bind(this)} disabled={!this.gs.enableReplayButtons.start}>Start</Button>
        <Button onClick={this.stop.bind(this)} disabled={!this.gs.enableReplayButtons.stop}>Stop</Button>
        <Button onClick={this.clean.bind(this)} disabled={!this.gs.enableReplayButtons.clean}>Clean</Button>
        <EventsPanel/>
      </div>
    );
  }
}

export default ReplayPanel