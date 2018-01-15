import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from '../../components/Header/';
import Home from '../../views/Home/';
import Sidebar from '../../components/Sidebar/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
              <Switch>
                <Route path="/home" name="Home" component={Home}/>
                <Redirect from="/" to="/home"/>
              </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default Full;
