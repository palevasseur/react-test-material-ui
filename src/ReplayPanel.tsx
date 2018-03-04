import * as React from 'react';
import Button from 'material-ui/Button';
import EventsPanel from "./EventsPanel";
import {IAppState} from "./stores";
import {inject, observer} from "mobx-react";
import {action} from "mobx";

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
  state = {
    loadedFile: ''
  };

  constructor(props: {appState:IAppState}) {
    super(props);
    this.gs = props.appState;
  }

  @action
  componentDidMount() {
    this.gs.view = 'replay';
  }

  @action
  load(e: any) {
    if(e.target.files.length) {
      const file =  e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.setState({loadedFile: e.target.result});
      };

      reader.readAsText(file);

      this.gs.replay = 'dataReady';
    }
  };

  selectFile() {
    const fileUploadDom: any = this.refs.fileUpload;
    fileUploadDom.click();
  }

  @action
  start() {
    this.gs.replay = 'playing';
  }

  @action
  stop() {
    this.gs.replay = 'dataReady';
  }

  @action
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
        <Button onClick={this.selectFile.bind(this)} disabled={!this.gs.enableReplayButtons.load}>Load</Button>
        <Button onClick={this.start.bind(this)} disabled={!this.gs.enableReplayButtons.start}>Start</Button>
        <Button onClick={this.stop.bind(this)} disabled={!this.gs.enableReplayButtons.stop}>Stop</Button>
        <Button onClick={this.clean.bind(this)} disabled={!this.gs.enableReplayButtons.clean}>Clean</Button>
        <EventsPanel/>

        <input style={{"display" : "none"}} ref="fileUpload" type="file" accept=".json" multiple onChange={this.load.bind(this)}/>
        <span>{this.state.loadedFile}</span>
      </div>
    );
  }
}

export default ReplayPanel