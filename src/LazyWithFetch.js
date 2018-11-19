import React from 'react';

class LazyWithFetch extends React.PureComponent {
  state = {
    loading: true,
    user: {},
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(json => this.setState(state => ({ user: json, loading: false })))
  }

  render() {
    const { user, loading } = this.state
    return (
      <div>
        {loading
          ? 'Thank you for waiting for me, please wait more, I am fetching data'
          : `This is the result ${JSON.stringify(user)}`}
      </div>
    )
  }
}

export default LazyWithFetch;
