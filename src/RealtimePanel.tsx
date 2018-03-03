import * as React from 'react';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import Checkbox from "material-ui/Checkbox";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import {IAppState} from "./stores";
import {inject, observer} from "mobx-react";
import {action} from "mobx";

/*
RT: ON / OFF
Cnx: Send Down / Send Up / Options : NFCP, NR, WEB, IRC
 */

@inject("appState")
@observer
class RealtimePanel extends React.Component<{appState?:IAppState}> {
  state = {
    nfcp: true,
    nr: true,
    web: true,
    irc: true,
  };

  private handleChange = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.checked });
  };

  @action
  private setRealtimeState(checked: boolean) {
    this.props.appState && (this.props.appState.realtime = checked ? 'on' : 'off')
  }

  render() {
    return (
      <div>
        <div>
          <span className='PaneTitle'>Realtime</span>
          <span style={{paddingLeft:'10px'}}>({this.props.appState && this.props.appState.realtime})</span>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={this.props.appState && this.props.appState.realtime == 'on'}
              onChange={(event, checked) => {this.setRealtimeState(checked)}}
            />
          }
          label="on/off"
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.nfcp}
                onChange={this.handleChange('nfcp')}
                value="nfcp"
              />
            }
            label="NFCP"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.nr}
                onChange={this.handleChange('nr')}
                value="nr"
              />
            }
            label="NR"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.web}
                onChange={this.handleChange('web')}
                value="web"
              />
            }
            label="WEB"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.irc}
                onChange={this.handleChange('irc')}
                value="irc"
              />
            }
            label="IRC"
          />
        </FormGroup>
        <Button>send up</Button>
        <Button>send down</Button>
      </div>
    );
  }
}

export default RealtimePanel