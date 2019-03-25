// React
import React, { Component } from 'react'
// Styles
import './App.css'
// Components
import MovieResult from './components/MovieResult/MovieResult'
// Dependencies
import _debounce from 'lodash/debounce'
import ReactPaginate from 'react-paginate'

const initialState = {
    text: '',
    movies: [],
    pages: 0,
    currentPage: 0,
    resultsMsg: null
}

class App extends Component {

    state = {...initialState}

    componentDidMount = () => {
        this.fetchMovies()
    }

    fetchMovies = (text='', pageNum=1) => {
        const url = !text ?
            `/popular?page=${pageNum}` :
            `/search?keywords=${text}&page=${pageNum}`

        fetch(url)
            .then(res => res.json())
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

    handleClear = () => this.setState(() => initialState, this.fetchMovies)

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
            resultsMsg
        } = this.state

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

                {pages > 1 &&
                    this.renderPaginate()
                }

                {!!resultsMsg ?
                    <div className="__no-results">{resultsMsg}</div> :
                    <div className="__results">
                        {movies.map(movie => <MovieResult
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
