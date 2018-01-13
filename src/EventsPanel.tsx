import * as React from 'react';
import {Checkbox, FormControlLabel} from 'material-ui';

class EventsPanel extends React.Component<{}> {
  state = {
    events: []
  };

  constructor(props: {}) {
    super(props);

    setInterval(_ => {
      let events: Array<string> = this.state.events.slice(0, 4);
      events.unshift((new Date()).toISOString().split(/[TZ]/)[1] + ' realtime headline');
      this.setState({events: events});
    }, 1000);
  };

  render() {
    return (
      <div>
        <div>
          <FormControlLabel control={<Checkbox/>} label="Realtime (3543)" />
          <FormControlLabel control={<Checkbox/>} label="Snapshot (3)" />
          <FormControlLabel control={<Checkbox/>} label="Subscription (3)" />
          <FormControlLabel control={<Checkbox/>} label="Cache (3)" />
          <FormControlLabel control={<Checkbox/>} label="Info (25)" />
        </div>
        {this.displayEvents()}
      </div>
    );
  }

  displayEvents() {
    let key = 0;
    return this.state.events.map(e => <div key={key++}>{e}</div>);
  }
}

export default EventsPanel