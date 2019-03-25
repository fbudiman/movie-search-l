// React
import React, { Component } from 'react'
// Styles
import './App.css'
// Dependencies
import _debounce from 'lodash/debounce'
// import ReactPaginate from 'react-paginate'

const initialState = {
    text: '',
}

class App extends Component {

    state = {...initialState}

    componentDidMount = () => {
        fetch('/popular')
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    fetchMovies = () => {
        
    }

    handleClear = () => this.setState(() => initialState)

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

    // handlePageChange = ({ selected }) => {
    //     this.fetchMovies(this.state.text, selected + 1)
    // }

    render() {
        const { text } = this.state

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
            </div>
        )
    }
}

export default App
