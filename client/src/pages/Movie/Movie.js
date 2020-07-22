// React
import React from 'react'
import { Link } from 'react-router-dom'
// Services
import { 
	getMovie,
	getSimilar
} from '../../services/movie'
// Styles
import './Movie.css'
// Components
import MovieResult from '../../components/MovieResult/MovieResult'
// Dependencies
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'

const base = 'https://image.tmdb.org/t/p/w500'

const initialState = {
	movie: {},
	similarMovies: [],
	viewSimilar: false
}

class Movie extends React.Component {

	state = {...initialState}

	componentDidMount = () => {
		const id = this.props.match.params.id

		this.fetchMovie(id)
	}

	componentDidUpdate = prevProps => {
		const { id } = this.props.match.params

		if (prevProps.match.params.id !== id) {
			this.setState(() => initialState, () => this.fetchMovie(id))
		}
	}

	fetchMovie = id => {
		getMovie(id)
			.then(movie => this.setState(() => ({
				movie
			})))
	}

	fetchSimilar = () => {
		if (!this.state.similarMovies.length) {
			const id = this.props.match.params.id

			getSimilar(id)
				.then(({ results }) => this.setState(() => ({
					similarMovies: results
				})))
		}
	}

	toggleSimilar = () => this.setState(prevState => ({
		viewSimilar: !prevState.viewSimilar
	}), this.fetchSimilar)

	stopProp = e => e.stopPropagation()

  	render() {
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

  		const {
  			viewSimilar,
  			similarMovies
  		} = this.state

  		const ratingsMsg = !vote_average && !vote_count ?
			'No Ratings.' :
			`Rated ${vote_average}/10 from ${vote_count.toLocaleString()} ${vote_count === 1 ? 'Review' : 'Reviews'}`

		const releaseDateMsg = !!release_date ?
			`Released ${moment(release_date).format('MMMM Do, YYYY')}` :
			'Release date unavailable.'

		const source = !!poster_path ?
			base + poster_path :
			''

		document.body.style.overflow = !!viewSimilar ?
			'hidden' :
			'auto'

    	return (
    		<div className="Movie">

    			{!!viewSimilar &&
    				<div 
    					className="__similar"
    					onClick={this.toggleSimilar}
    				>
    					<div className="__container">
	    					{similarMovies.map(movie => <MovieResult
	                            key={movie.id}
	                            movie={movie}
	                        />)}
						</div>
    				</div>
    			}

				<div className="__buttons">
					<div className="__button">
						<Link to={`/`} onClick={e => this.stopProp(e)}>
							Home
						</Link>
					</div>

					<div 
						className="__button" 
						onClick={this.toggleSimilar}
					>
						View similar movies
					</div>
				</div>

    			{!_isEmpty(this.state.movie) &&
    				<div className="__body">
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
					</div>
				}
    		</div>
    	)
  	}
}

export default Movie
