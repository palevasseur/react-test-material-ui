import * as React from 'react';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import Checkbox from "material-ui/Checkbox";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import stores from "./stores";
import {observer} from "mobx-react";

/*
RT: ON / OFF
Cnx: Send Down / Send Up / Options : NFCP, NR, WEB, IRC
 */

@observer(['appState'])
class RealtimePanel extends React.Component {
  state = {
    nfcp: true,
    nr: true,
    web: true,
    irc: true,
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <div>
          <span className='PaneTitle'>Realtime</span>
          <span style={{paddingLeft:'10px'}}>({stores.appState.realtime})</span>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={stores.appState.realtime == 'on'}
              onChange={(event, checked) => {stores.appState.realtime = checked ? 'on' : 'off'}}
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