import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";

import ClassSelector from "./components/ClassSelector";
import InstructorForm from "./components/InstructorForm";
import Login from "./components/Login";
import InstructorDashboard from "./components/InstructorDashboard.js";
import ClientDashboard from "./components/ClientDashboard";
import { HomeDiv, NavLinks } from './components/formStyles'

import Hero from './static/fitness-hero.jpg'
import Logo from './static/logoAF.png'

function App() {
  return (
    <Router>
      <HomeDiv>
        <img id='Logo' src={Logo} alt='AF-logo' />
        <img id='Hero' src={Hero} alt='t' width='80%' height='auto' />
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="register">Register</Link>
        </NavLinks>
        <Switch>

          <Route exact path="/instructor" component={InstructorDashboard} />
          <Route exact path="/client" component={ClientDashboard} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <SignUpForm />
          </Route>
        </Switch>
      </HomeDiv>
    </Router>
  );
}
export default App;