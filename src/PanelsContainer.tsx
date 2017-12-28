import * as React from 'react';
import { withTheme } from 'material-ui/styles'
import InfoPanel from "./InfoPanel";
import RealtimePanel from "./RealtimePanel";
import ReplayPanel from "./ReplayPanel";
import RecordPanel from "./RecordPanel";
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import {observer, Provider} from "mobx-react";
import stores from "./stores";
import Button from "material-ui/Button";

class PanelsContainer extends React.Component<any> {
  style: any;
  constructor(props: any){
    super(props);

    this.style = {
        background: props.theme.palette.background.default,
        color: props.theme.palette.text.primary
    }
  }

  render() {
    return (
      <Provider appState={stores.appState}>
      <div style={this.style}>
        <NavigationBar/>
        <SimpleAdvancedSwitch/>
      </div>
      </Provider>
    );
  }
}

const linkStyle = {color:'inherit', textDecoration: 'none'};
const linkStyleDisable = {color:'grey'};
@observer(['appState'])
class NavigationBar extends React.Component<any> {
  render() {
    return (
      <div style={{float: 'right'}}>
        {stores.appState.enableNavigationLinks.simple && stores.appState.view !== 'simple'
          ? <Link style={linkStyle} to='/simple'>Snapshot</Link>
          : <span style={linkStyleDisable}>Snapshot</span>}
        &bull;
        {stores.appState.enableNavigationLinks.record && stores.appState.view !== 'record'
          ? <Link style={linkStyle} to='/advanced/record'>Record</Link>
          : <span style={linkStyleDisable}>Record</span>}
        &bull;
        {stores.appState.enableNavigationLinks.replay && stores.appState.view !== 'replay'
          ? <Link style={linkStyle} to='/advanced/replay'>Replay</Link>
          : <span style={linkStyleDisable}>Replay</span>}
      </div>
    );
  }
}

const SimpleAdvancedSwitch = () => (
  <Switch>
    <Route exact path='/' component={SimpleContainer}/>
    <Route path='/simple' component={SimpleContainer}/>
    <Route path='/advanced' component={AdvancedContainer}/>
  </Switch>
);

@observer(['appState'])
class SimpleContainer extends React.Component {
  constructor(props: any) {
    super(props);

    stores.appState.view = 'simple';
  }

  render() {
    return (
      <div>
        <InfoPanel/>

        <div className='PaneTitle'>Snapshot</div>
        <Button>Save</Button>
      </div>
    );
  }
}

const AdvancedContainer = () => (
  <div>
    <InfoPanel/>
    <RealtimePanel/>
    <RecordReplaySwitch/>
  </div>
);

const RecordReplaySwitch = () => (
  <Switch>
    <Route exact path='/advanced' component={RecordPanel}/>
    <Route path='/advanced/record' component={RecordPanel}/>
    <Route path='/advanced/replay' component={ReplayPanel}/>
  </Switch>
);

export default withTheme()(PanelsContainer)