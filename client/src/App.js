import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import "./styles/App.css"
import Navbar from './components/widgets/Navbar'
import Home from './components/pages/Home'
import Users from './components/pages/Users'
import History from './components/pages/History'
import Register from './components/pages/Register';
import Demo from './components/pages/Demo';
import Deposite from './components/pages/Deposite';
import Login from './components/pages/Login';
import Error from './components/pages/Error';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/home/users/:transfer" exact component={() => <Demo />} />
          <Route path="/home/users" exact component={() => <Users />} />
          <Route path="/home/depositeandwithdraw" exact component={() => <Deposite/>} />
          <Route path="/home/history" exact component={() => <History />} />
          <Route path="/home/register" exact component={() => <Register />} />
          <Route path="/home" exact component={() => <Home />} />
          {/* <Route path="/" exact component={() => <Login /> }/> */}
          <Route path ="*" component={<Error />} />
        </Switch>

      </div>
    </Router>
  )
}

export default App


