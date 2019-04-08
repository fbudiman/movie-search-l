// React
import React from 'react'
// Services
import { 
	getMovie,
	getSimilar,
	getReviews,
	getCredits
} from '../../services/movie'
// Styles
import './Movie.css'
// Components
import MovieResult from '../MovieResult/MovieResult'
import Review from '../Review/Review'
// Dependencies
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'

const base = 'https://image.tmdb.org/t/p/w500'

const initialState = {
	movie: {},
	similarMovies: [],
	reviews: [],
	credits: {
		director: null,
		cast: []
	},
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
			}), this.fetchDetails))
	}

	fetchSimilar = () => {
		if (!this.state.similarMovies.length) {
			const id = this.props.match.params.id

			getSimilar(id)
				.then(({ results }) => this.setState(() => ({
					similarMovies: results.slice(0, 5)
				})))
		}
	}

	fetchReviews = () => {
		const id = this.props.match.params.id

		getReviews(id)
			.then(({ results }) => this.setState(() => ({
				reviews: results.slice(0, 5)
			})))
	}

	fetchCredit = () => {
		const id = this.props.match.params.id

		getCredits(id)
			.then(({ cast, crew }) => this.setState(() => ({
				credits: {
					director: crew.find(crew => crew.job.toUpperCase() === 'DIRECTOR'),
					cast: cast.slice(0, 5)
				}
			})))
	}

	fetchDetails = () => {
		this.fetchSimilar()
		this.fetchReviews()
		this.fetchCredit()
	}

	toggleSimilar = () => this.setState(prevState => ({
		viewSimilar: !prevState.viewSimilar
	}), this.fetchSimilar)

	renderReviews() {
		return this.state.reviews.map(review => <Review
			key={review.id}
			review={review}
		/>)
	}

	renderSimilarMovies() {
		return this.state.similarMovies.map(movie => <MovieResult 
			key={movie.id}
			movie={movie}
		/>)
	}

	renderCredits() {
		const { director, cast } = this.state.credits

		return (
			<div className="__container">
				{!_isEmpty(director) &&
					<div className="__director">
						<div>Director</div>
						{!!director.profile_path ?
							<img src={base + director.profile_path} alt="Director" /> :
							<div>Photo Unavailable</div>
						}
						<div>{director.name}</div>
					</div>
				}
				<div>Cast</div>
				<div className="__cast">
					{cast.map(member => <div key={member.id}>
						{!!member.profile_path ?
							<img src={base + member.profile_path} alt="Cast" /> :
							<div>Photo Unavailable</div>
						}
						<div>{member.name} as {member.character}</div>
					</div>)}
				</div>
			</div>
		)
	}

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
  			similarMovies,
  			reviews,
  			credits
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

		console.log('credits', credits)

    	return (
    		<div className="Movie">

    			{/*!!viewSimilar &&
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
    			*/}

	    		{/*<div 
	    			className="__button" 
	    			onClick={this.toggleSimilar}
	    		>
	    			View similar movies
	    		</div>*/}

    			{!_isEmpty(this.state.movie) &&
    				<React.Fragment>
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

						<div>Similar Movies</div>
						<div className="__similar-movies">
							{this.renderSimilarMovies()}
						</div>

						<div>Reviews</div>
						<div className="__reviews">
							{this.renderReviews()}
						</div>

						<div>Cast & Crew</div>
						<div className="__credits">
							{this.renderCredits()}
						</div>
					</React.Fragment>
				}
    		</div>
    	)
  	}
}

export default Movie
