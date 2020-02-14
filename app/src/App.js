import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage' ;
import BranchOut from './components/BranchOut';
import AddVerbs from './components/AddVerbs';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

function App() {
  return (
    <Router>
    <div className="App">
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
     <Tab eventKey="home" title="Home">
      <Route exact path = "/">
          <HomePage />
      </Route>
      <Route 
      path = '/BranchOut' 
      component = {BranchOut}
      />
    </Tab>
    <Tab eventKey="addroots" title="Add">
      <Route exact path = "/">
          <AddVerbs />
      </Route>
    </Tab>
    </Tabs>
    </div>
    </Router>
  );
}

export default App;
