import * as React from 'react';
import './App.css';

//import Button from 'material-ui/Button';
//import {computed, observable} from "mobx";
//import {observer} from "mobx-react";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import PanelsContainer from "./PanelsContainer";

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

//const logo = require('./logo.svg');

/*class Person {
  @observable firstName = 'Michel';
  @observable lastName = 'Weststrate';
  @observable nickName: string;

  @computed get fullName() {
    return this.firstName + " " + this.lastName;
  }
}

// Example React component that observes state
@observer
class ProfileView extends React.Component<{person:Person}> {
  render() {
    if (this.props.person.nickName)
      return <div>{this.props.person.nickName}</div>
    else
      return <div>{this.props.person.fullName}</div>
  }
}*/

class App extends React.Component<any> {
  /*michel = new Person();

  private setNickName() {
    this.michel.nickName = "mw";
  }*/

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <PanelsContainer/>
      </MuiThemeProvider>
    );
  }
}


/*       <div className="App">
       <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload !
        </p>

        <div>
          <Button raised color="primary" onClick={this.setNickName.bind(this)}>
            set nick name
          </Button>
        </div>

        <br/>
        <ProfileView person={this.michel}/>
      </div>*/

export default App;
