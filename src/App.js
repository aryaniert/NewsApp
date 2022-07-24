import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
}from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

const App =()=> {
   const pageSize = 5;
   const apiKey = '3aaaa6e4fa754609814efae2e9a90d21';

   const state = {
     progress:0
   }
   const setProgress = (progress)=>{
     setState({progress:progress});
   }

    return (
      <div>
        <NavBar/>
        <News/>
      </div>
    )
}

export default App;