// React
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import './Movie.css'
// Dependencies
import moment from 'moment'

class Movie extends React.Component {
  	render() {
    	return <div>MOVIE PAGE {this.props.match.params.id}</div>
  	}
}

export default Movie
