import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyADxnaCLwM5aZhR015qf6Mthz95A_phMJg',
      authDomain: 'manager-8e3d9.firebaseapp.com',
      databaseURL: 'https://manager-8e3d9.firebaseio.com',
      projectId: 'manager-8e3d9',
      storageBucket: 'manager-8e3d9.appspot.com',
      messagingSenderId: '441287869964',
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
