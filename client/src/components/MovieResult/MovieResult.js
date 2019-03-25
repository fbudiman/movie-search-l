// React
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// Styles
import './MovieResult.css'
// Dependencies
import moment from 'moment'

const base = 'https://image.tmdb.org/t/p/w200'

const MovieResult = ({ movie }) => {

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
		<div className="MovieResult" title={title}>
			<Link to={`/movie/${movie.id}`}>
				<div className="__poster">
					{!!poster_path ? 
						<img src={base + poster_path} alt="Movie Poster" /> :
						<div className="--unavailable">Poster Unavailable</div>
					}
				</div>
			</Link>
		</div>
	)
}

MovieResult.propTypes = {
	movie: PropTypes.object.isRequired
}

export default MovieResult
