import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Feed from './components/Feed';
import Logout from './components/Logout';
import Signup from './components/Signup';
import EditTweet from './components/EditTweet';
import Authenticate from './components/Authenticate';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import NavigationBar from './components/NavigationBar';
import { checkSession } from './services/session';
//Switch gir exclusive OR på match av path for children. Rendrer bare første treff.
class App extends Component {
  constructor(props) {
    super(props) 

      this.state = {
        isAuthenticated: false
      }
    }

    async componentDidMount() {   
      const isChecked = await checkSession()
      console.log(isChecked);
      console.log(this.state)
      this.setState({ isAuthenticated:isChecked })
    }

  
  render() {
    const { isAuthenticated } = this.state;

    return (
      <React.Fragment>
        {isAuthenticated && <NavigationBar />}
        <Layout>
          <Router>
            <Switch>
              <Route path="/" exact component={Authenticate} />
              <Route path="/home" component={Feed} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={Signup} />
              <Route path="/editTweet/:id" component={EditTweet} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
