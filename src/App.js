import React, { Component, Suspense } from 'react';
import { Pure, NotPure } from './Stateful'
import { Stateless, StatelessWithMemo, StatelessWithEqual } from './Stateless'
import Derived from './Derived'
import AsynsData from './AsynsData'
import './index.css'

const LazyComponent = React.lazy(() => import('./Lazy'));
const LazyWithFetchComponent = React.lazy(() => import('./LazyWithFetch'));

class App extends Component {
  state = {
    showLazy: false,
    showLazyWithFetch: false,
    numbers: [0],
    id: 1,
  }

  showLazyComponent = () => this.setState({ showLazy: true })
  showLazyComponentWithFetch = () => this.setState({ showLazyWithFetch: true })

  addNumber = () => {
    const { numbers } = this.state
    numbers.push(numbers.length)
    this.setState({ numbers })
  }

  increaseId = () => {
    this.setState(state => ({ id: state.id + 1 }))
  }

  render() {
    const { numbers, id } = this.state

    return (
      <div>
        <button onClick={this.showLazyComponent}>
          Show lazy component
        </button>
        { this.state.showLazy && (
          <Suspense fallback={<div>Loading the component...</div>}>
            <LazyComponent />
          </Suspense>
        )}
        <hr />
        <button onClick={this.showLazyComponentWithFetch}>
          Show lazy component with fetch
        </button>
        { this.state.showLazyWithFetch && (
          <Suspense fallback={<div>Loading the component...</div>}>
            <LazyWithFetchComponent />
          </Suspense>
        )}
        <hr />
        <button onClick={this.increaseId}>
          Current id is {id}, click to increase
        </button>
        <br />
        Deprecated life cycle: componentWillMount, componentWillReceiveProps, and componentWillUpdate
        <br />
        componentWillReceiveProps can be replace with getDerivedStateFromProps for Derived state and componentDidUpdate for Asyns fetch
        <br /><br />
        <Derived id={id} />
        <hr />
        <AsynsData id={id} />
        <hr />
        <button onClick={this.addNumber}>
          Add number
        </button>
        <table>
          <tbody>
            <tr>
              <th>Stateful Component</th>
              <th>Stateful PureComponent</th>
              <th>Stateless Component</th>
              <th>Stateless Memo Component</th>
              <th>Stateless Memo and equal Component</th>
            </tr>
            <tr>
              <td><NotPure numbers={numbers} /></td>
              <td><Pure numbers={numbers} /></td>
              <td><Stateless numbers={numbers} /></td>
              <td><StatelessWithMemo numbers={numbers} /></td>
              <td><StatelessWithEqual numbers={numbers} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

// Note:
// https://reactjs.org/blog/2018/10/23/react-v-16-6.html
// Memo
// Lazy: Import suspense, suspense is mandatory