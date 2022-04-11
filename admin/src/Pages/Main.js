import React from 'react'
import Login from './Login'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AdminIndex from './AdminIndex'

export default function Main() {
  return (
    <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/index/"  component={AdminIndex}/>
    </Router>
  )
}
