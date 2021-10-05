import React from 'react';
import { Heading } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import UserContextProvider from './context/UserContex';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Switch>
          <Route path="/dashboard">
            <Heading>Dashboard</Heading>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;
