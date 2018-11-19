import React from 'react';

class AsyncData extends React.Component {
  state = {
    todo: {},
  }

  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.id}`)
      .then(response => response.json())
      .then(json => this.setState(state => ({ todo: json })))
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // This life cycle is called after render
    if (prevProps.id !== this.props.id) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.id}`)
        .then(response => response.json())
        .then(json => this.setState(state => ({ todo: json })))
    }
  }

  render() {
    return (
      <div>
        This is async fetch. The data is <b>{JSON.stringify(this.state.todo)}</b>
      </div>
    );
  }
}

export default AsyncData;
