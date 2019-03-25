// React
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import './Movie.css'
// Dependencies
import moment from 'moment'

const base = 'https://image.tmdb.org/t/p/w200'

const Movie = ({ movie }) => {

	const {
		title,
		poster_path,
		release_date,
		vote_average,
		vote_count,
		overview
	} = movie

	const ratingsMsg = !vote_average && !vote_count ?
		'No Ratings.' :
		`Rated ${vote_average}/10 from ${vote_count.toLocaleString()} ${vote_count === 1 ? 'Review' : 'Reviews'}`

	const releaseDateMsg = !!release_date ?
		`Released ${moment(release_date).format('MMMM Do, YYYY')}` :
		'Release date unavailable.'

	return (
		<div className="Movie" title={title}>
			<div className="__poster">
				{!!poster_path ? 
					<img src={base + poster_path} alt="Movie Poster" /> :
					<div className="--unavailable">Poster Unavailable</div>
				}
			</div>
			<div className="__details">
				<div className="title">
					{title}
				</div>
				<div className="date">
					{releaseDateMsg}
				</div>
				<div className="rating">
					{ratingsMsg}
				</div>
				<div className="summary">
					{overview}
				</div>
			</div>
		</div>
	)
}

Movie.propTypes = {
	movie: PropTypes.object.isRequired
}

export default Movie
