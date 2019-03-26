// React
import React, { Component } from 'react'
// Services
import {
    searchMovies,
    searchPopular,
    getGenres
} from './services/movie'
// Styles
import './App.css'
// Components
import MovieResult from './components/MovieResult/MovieResult'
// Dependencies
import _debounce from 'lodash/debounce'
import _cloneDeep from 'lodash/cloneDeep'
import _pull from 'lodash/pull'
import ReactPaginate from 'react-paginate'

const initialState = {
    text: '',
    movies: [],
    pages: 0,
    currentPage: 0,
    resultsMsg: null,
    genres: [],
    includeGenres: []
}

class App extends Component {

    state = {...initialState}

    componentDidMount = () => {
        this.fetchAll()
    }

    fetchAll = () => {
        this.fetchGenres()
        this.fetchMovies()
    }

    fetchGenres = () => {
        getGenres()
            .then(({ genres }) => this.setState(() => ({
                genres
            })))
    }

    fetchMovies = (text='', pageNum=1) => {
        const search = !text ?
            searchPopular :
            searchMovies

        const searchData = {
            keywords: text,
            page: pageNum
        }

        search(searchData)
            .then(({ results, page, total_pages }) => {
                this.setState(() => ({
                    movies: results,
                    currentPage: page - 1,
                    pages: total_pages > 1000 ?
                        1000 : total_pages,
                    resultsMsg: !results.length ?
                        'Your search did not match any movie titles.' : null
                }))
            })
    }

    handleClear = () => this.setState(() => initialState, this.fetchAll)

    handleSearch = _debounce(text => {
        if (!text) {
            this.handleClear()
        } else {
            this.fetchMovies(text)
        }
    }, 175) // more? less?

    handleTextChange = ({ target }) => this.setState(() => ({ 
        text: target.value
    }), () => this.handleSearch(target.value))

    handlePageChange = ({ selected }) => {
        this.fetchMovies(this.state.text, selected + 1)
    }

    handleFilter = id => {
        let { includeGenres } = _cloneDeep(this.state)
        includeGenres.includes(id) ?
            _pull(includeGenres, id) :
            includeGenres.push(id)

        this.setState(() => ({
            includeGenres
        }))
    }

    renderPaginate = () => <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={this.state.pages}
        forcePage={this.state.currentPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={8}
        onPageChange={this.handlePageChange}
        containerClassName={'__pagination'}
        activeClassName={'--active'}
    />

    render() {
        const { 
            text, 
            movies,
            pages,
            resultsMsg,
            genres,
            includeGenres
        } = this.state

        const moviesByGenre = !includeGenres.length ?
            movies :
            movies.filter(({ genre_ids }) => genre_ids.some(id => includeGenres.includes(id)))

        document.body.style.overflow = 'auto'

        return (
            <div className="App">
                <h2>Movie Search</h2>

                <div className="__search-input">
                    <input
                        type="text"
                        placeholder="Movie Titles..."
                        value={text}
                        onChange={this.handleTextChange}
                    />
                    <span onClick={this.handleClear}>
                        Clear
                    </span>
                </div>

                <div className="__genres">
                    {genres.map(genre => <div 
                        className={includeGenres.includes(genre.id) ? 'active' : ''}
                        key={genre.id}
                        onClick={() => this.handleFilter(genre.id)}>
                            {genre.name}
                        </div>
                    )}
                </div>

                {pages > 1 &&
                    this.renderPaginate()
                }

                {!!resultsMsg ?
                    <div className="__no-results">{resultsMsg}</div> :
                    <div className="__results">
                        {moviesByGenre.map(movie => <MovieResult
                            key={movie.id}
                            movie={movie}
                        />)}
                    </div>
                }

                {pages > 1 &&
                    this.renderPaginate()
                }
            </div>
        )
    }
}

export default App
