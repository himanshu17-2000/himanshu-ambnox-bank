import React from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import "./styles/App.css"
import Navbar from './components/widgets/Navbar'
import Home from './components/pages/Home'
import Users from './components/pages/Users'
import History from './components/pages/History'
import Register from './components/pages/Register';
import Demo from './components/pages/Demo';
import Deposite from './components/pages/Deposite';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/users/:transfer" exact component={Demo} />
          <Route path="/users" exact component={Users} />
          <Route path="/depositeandwithdraw" exact component={Deposite} />

          <Route path="/history" exact component={History} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />
        </Switch>

      </div>
    </Router>
  )
}

export default App


