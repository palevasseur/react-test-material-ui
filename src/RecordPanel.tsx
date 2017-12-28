import * as React from 'react';
import Button from 'material-ui/Button';
import EventsPanel from "./EventsPanel";
import stores from "./stores";
import {observer} from "mobx-react";

/*
Record: Start / Stop / Clean / Options : Enable circular subscriptions dump
        Take Snapshot
Events:
[]Realtime (x) / []Snapshot (x) / []Subscription (x) / []Cache (x) / []Info (x)
 - eee
 - eee
 */

@observer(['appState'])
class RecordPanel extends React.Component {
  constructor(props:any) {
    super(props);

    stores.appState.view = 'record';
  }

  start() {
    stores.appState.record = 'recording';
  };

  stop() {
    stores.appState.record = 'dataReady';
  };

  clean() {
    stores.appState.record = 'empty';
  };

  render() {
    return (
      <div>
        <div>
          <span className='PaneTitle'>Record</span>
          <span style={{paddingLeft:'10px'}}>({stores.appState.record})</span>
        </div>
        <Button onClick={this.start.bind(this)} disabled={!stores.appState.enableRecordButtons.start}>Start</Button>
        <Button onClick={this.stop.bind(this)} disabled={!stores.appState.enableRecordButtons.stop}>Stop</Button>
        <Button onClick={this.clean.bind(this)} disabled={!stores.appState.enableRecordButtons.clean}>Clean</Button>
        <EventsPanel/>
      </div>
    );
  }
}

export default RecordPanel