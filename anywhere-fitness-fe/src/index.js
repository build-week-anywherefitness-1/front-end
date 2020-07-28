import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import { instructorReducers } from './store/reducers/instructorReducers'

import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import App from "./App";


const store = createStore(instructorReducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("root")
);
