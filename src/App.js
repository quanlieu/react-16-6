import React, { Component, Suspense } from 'react';
import { Pure, NotPure } from './Stateful'
import { Stateless, StatelessWithMemo, StatelessWithEqual } from './Stateless'
import Derived from './Derived'
import AsynsData from './AsynsData'
import './index.css'

const LazyComponent = React.lazy(() => import('./Lazy'));

class App extends Component {
  state = {
    showLazy: false,
    numbers: [0],
    id: 1,
  }

  showSuspense = () => this.setState({ showLazy: true })

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
        <button onClick={this.showSuspense}>
          Show suspense
        </button>
        <button onClick={this.addNumber}>
          Add number
        </button>
        <button onClick={this.increaseId}>
          Increase id
        </button>
        { this.state.showLazy && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent numbers={numbers} />
          </Suspense>
        )}
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
        <Derived id={id} />
        <AsynsData id={id} />
      </div>
    );
  }
}

export default App;

// Note:
// Memo
// Lazy: Import suspense, suspense is mandatory
// Error: Boundary, good for dashboard getDerivedStateFromError or componentDidCatch
// Life cycle: componentWillMount, componentWillReceiveProps, and componentWillUpdate
// componentWillReceiveProps: getDerivedStateFromProps and componentDidUpdate