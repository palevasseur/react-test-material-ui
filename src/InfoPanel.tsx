import * as React from 'react';

class InfoPanel extends React.Component<any> {
  render() {
    return (
      <div>
        <div className='PaneTitle'>Info</div>
        <div>News-module version</div>
        <div>Realtime feeds: up/down</div>
        <div>Realtime rate: xx h/min</div>
        <div>
          <div>Current subscriptions</div>
          <div> - xx</div>
          <div> - yy</div>
        </div>
      </div>
    );
  }
}

export default InfoPanel