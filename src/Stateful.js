import React from 'react';

export class Pure extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.numbers.map(v => <p key={v}>{v}</p>)}
      </div>
    );
  }
}

export class NotPure extends React.Component {
  render() {
    return (
      <div>
        {this.props.numbers.map(v => <p key={v}>{v}</p>)}
      </div>
    );
  }
}