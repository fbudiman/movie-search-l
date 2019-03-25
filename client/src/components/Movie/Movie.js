// React
import React from 'react'
// Styles
import './Movie.css'
// Dependencies
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'

const base = 'https://image.tmdb.org/t/p/w500'

class Movie extends React.Component {

	state = {
		movie: {}
	}

	componentDidMount = () => {
		const id = this.props.match.params.id

		this.fetchMovie(id)
	}

	fetchMovie = id => {
		fetch(`/movie?id=${id}`)
			.then(res => res.json())
			.then(movie => this.setState(() => ({
				movie
			})))
	}

  	render() {
  		console.log(this.state.movie)

  		const {
  			poster_path,
  			title,
  			release_date,
  			tagline,
  			overview,
  			vote_average,
  			vote_count,
  			genres,
  			production_companies
  		} = this.state.movie

  		const ratingsMsg = !vote_average && !vote_count ?
			'No Ratings.' :
			`Rated ${vote_average}/10 from ${vote_count.toLocaleString()} ${vote_count === 1 ? 'Review' : 'Reviews'}`

		const releaseDateMsg = !!release_date ?
			`Released ${moment(release_date).format('MMMM Do, YYYY')}` :
			'Release date unavailable.'

		const source = !!poster_path ?
			base + poster_path :
			''

    	return (
    		<div className="Movie">
    			{!_isEmpty(this.state.movie) &&
    				<React.Fragment>
		    			<div className="__poster">
							{!!source ?
		    					<img src={source} alt="Movie Poster" /> :
		    					<div>Poster Unavailable</div>
		    				}
		    			</div>
		    			<div className="__details">
							<h1 className="title">
								{title}
							</h1>
							<div className="tagline">
								{tagline}
							</div>
							<div className="date">
								{releaseDateMsg}
							</div>
							<div className="rating">
								{ratingsMsg}
							</div>
							<div className="genre">
								{genres.map(({ name, id }) => (
									<div key={id}>{name}</div>
								))}
							</div>
							<div className="summary">
								{overview}
							</div>
							<div className="production">
								<div>Production Companies</div>
								{!!production_companies.length ?
									production_companies.map(({ name, id }) => (
										<div key={id}>{name}</div>
									)) :
									<div>N/A</div>
								}
							</div>
						</div>
					</React.Fragment>
				}
    		</div>
    	)
  	}
}

export default Movie
