import * as React from 'react';
import {Checkbox, FormControlLabel} from 'material-ui';

class EventsPanel extends React.Component {
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
        <div> event 1</div>
        <div> event 2</div>
      </div>
    );
  }
}

export default EventsPanel