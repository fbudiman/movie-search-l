// React
import React from 'react'
// Styles
import './Review.css'


class Review extends React.Component {

	state = {
		expanded: false
	}

	toggleContent = () => this.setState(prevState => ({
		expanded: !prevState.expanded
	}))

	render() {
		const { review } = this.props

		return (
			<div className="__review">
				{!this.state.expanded ?
					<React.Fragment>
						<div className="__trunc-content">
							{review.content.slice(0, 200)}...
						</div>
						<div 
							className="__toggle" 
							onClick={this.toggleContent}>
							See More
						</div>
					</React.Fragment> :
					<React.Fragment>
						<div className="__content">{review.content}</div>
						<div 
							className="__toggle" 
							onClick={this.toggleContent}>
							See Less
						</div>
					</React.Fragment>
				}
			</div>
		)
	}

}

export default Review