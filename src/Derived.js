import React from 'react';

class Derived extends React.PureComponent {
  state = {
    parity: ''
  }

  componentDidMount() {
    const parity = this.props.id % 2 ? 'odd' : 'even';
    this.setState({ parity })
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    // This life cycle is called before shouldComponentUpdate
    const parity = nextProps.id % 2 ? 'odd' : 'even';
    if (parity !== prevState.parity){
      return { parity };
    }

    return null;
  }

  render() {
    return (
      <div>
        This is a Derived state, props.id is <b>{this.state.parity}</b> number
      </div>
    );
  }
}

export default Derived;
