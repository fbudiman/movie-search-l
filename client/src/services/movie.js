import axios from 'axios'

export const searchMovies = ({ keywords, page }) => axios.get(`/search?keywords=${keywords}&page=${page}`)
	.then(({ data }) => data)
	.catch(err => {
		console.log(err)
	})

export const searchPopular = ({ page }) => axios.get(`/popular?page=${page}`)
	.then(({ data }) => data)
	.catch(err => {
		console.log(err)
	})

export const getMovie = id => axios.get(`/movie?id=${id}`)
	.then(({ data }) => data)
	.catch(err => {
		console.log(err)
	})

export const getSimilar = id => axios.get(`/similar?id=${id}`)
	.then(({ data }) => data)
	.catch(err => {
		console.log(err)
	})