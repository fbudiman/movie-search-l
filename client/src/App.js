// React
import React, { Component } from 'react'
// Styles
import './App.css'

const initialState = {
    text: '',
}

class App extends Component {

    state = {...initialState}

    componentDidMount = () => {
        fetch('/search/movie')
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    handleTextChange = () => {

    }

    handleClear = () => {

    }

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
