import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Products from './components/products';
import Header from './components/header';
import Me from './components/me';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import store from './store';
import './App.css';

class App extends Component {
  render() {
    const ConnectedHeader = withRouter(Header);
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <ConnectedHeader />
            <div className="Main">
              <Route exact path="/" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/products" component={Products} />
              <Route path="/me" component={Me} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
