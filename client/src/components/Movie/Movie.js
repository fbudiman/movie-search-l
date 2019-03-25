// React
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import './Movie.css'
// Dependencies
import moment from 'moment'

// const base = 'https://image.tmdb.org/t/p/w200'

const Movie = ({ movie }) => {

	return (
		<div>MOVIE PAGE</div>
	)
}

Movie.propTypes = {
	movie: PropTypes.object.isRequired
}

export default Movie
