// React
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Components
import App from './App'
import Movie from './components/Movie/Movie'
// Styles
import './index.css'
// Service
import * as serviceWorker from './serviceWorker'

// ReactDOM.render(<App />, document.getElementById('root'));

const routing = (
  	<Router>
    	<div>
      		<Route exact path="/" component={App} />
      		<Route path="/movie/:id" component={Movie} />
    	</div>
  	</Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


