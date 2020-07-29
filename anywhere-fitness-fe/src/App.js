import React from 'react';
import { Route, Switch } from 'react-router-dom'

import SignUpForm from './components/SignUpForm'
import ClassSelector from './components/ClassSelector'
import InstructorForm from './components/InstructorForm'
import Login from './components/Login'



function App() {
  return (
    <div>
      <Switch>

        <Route path='/' >
          <Login />
          <InstructorForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
