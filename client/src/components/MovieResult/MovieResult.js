// React
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// Styles
import './MovieResult.css'

const base = 'https://image.tmdb.org/t/p/w200'

const MovieResult = ({ movie }) => {

	const {
		id,
		title,
		poster_path
	} = movie

	const stopProp = e => e.stopPropagation()

	return (
		<div className="MovieResult" title={title}>
			<Link to={`/movie/${id}`} onClick={e => stopProp(e)}>
				<div className="__poster">
					{!!poster_path ? 
						<img src={base + poster_path} alt="Movie Poster" /> :
						<div className="--unavailable">Poster Unavailable</div>
					}
				</div>
			</Link>
			<div>{title}</div>
		</div>
	)
}

MovieResult.propTypes = {
	movie: PropTypes.object.isRequired
}

export default MovieResult
