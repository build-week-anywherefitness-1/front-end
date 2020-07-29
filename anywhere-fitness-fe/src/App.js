import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import SignUpForm from "./components/SignUpForm";
import ClassSelector from "./components/ClassSelector";
import InstructorForm from "./components/InstructorForm";
import Login from "./components/Login";
import InstructorDashboard from "./components/InstructorDashboard";
import ClientDashboard from "./components/ClientDashboard";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="register">Register</Link>
        </nav>

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
      </div>
    </Router>
  );
}

export default App;
