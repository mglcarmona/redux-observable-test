import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {Creators} from './store'

function App(props) {
  useEffect(() => {
    console.log('PROPS', props);
    props.fillUsers();
  }, [props]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapState = state => state;
const mapDispatch = dispatch => ({
  fillUsers: () => dispatch(Creators.fillUsers()),
});
export default connect(mapState, mapDispatch)(App);
