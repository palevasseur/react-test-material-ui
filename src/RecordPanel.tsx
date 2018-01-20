import * as React from 'react';
import Button from 'material-ui/Button';
import EventsPanel from "./EventsPanel";
import {IAppState} from "./stores";
import {inject, observer} from "mobx-react";

/*
Record: Start / Stop / Clean / Options : Enable circular subscriptions dump
        Take Snapshot
Events:
[]Realtime (x) / []Snapshot (x) / []Subscription (x) / []Cache (x) / []Info (x)
 - eee
 - eee
 */

@inject("appState")
@observer
class RecordPanel extends React.Component<{appState:IAppState}> {
  private gs: IAppState;

  constructor(props: {appState:IAppState}) {
    super(props);
    this.gs = props.appState;
  }

  componentDidMount() {
    this.gs.view = 'record';
  }

  start() {
    this.gs.record = 'recording';
  };

  stop() {
    this.gs.record = 'dataReady';
  };

  clean() {
    this.gs.record = 'empty';
  };

  render() {
    return (
      <div>
        <div>
          <span className='PaneTitle'>Record</span>
          <span style={{paddingLeft:'10px'}}>({this.gs.record})</span>
        </div>
        <Button onClick={this.start.bind(this)} disabled={!this.gs.enableRecordButtons.start}>Start</Button>
        <Button onClick={this.stop.bind(this)} disabled={!this.gs.enableRecordButtons.stop}>Stop</Button>
        <Button onClick={this.clean.bind(this)} disabled={!this.gs.enableRecordButtons.clean}>Clean</Button>
        <EventsPanel/>
      </div>
    );
  }
}

export default RecordPanel