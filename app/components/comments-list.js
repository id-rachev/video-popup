import React, { Component } from 'react';
import _ from 'lodash';
import RepliesList from './replies-list';

export default class CommentsList extends Component {

	milisecToDateTime(timestamp) {
		const dateTime = new Date(timestamp).toDateString()
			+ ' AT ' + new Date(timestamp).toLocaleTimeString();
		return dateTime;
	}

	renderComments() {
		return _.map(this.props.comments, comment => {
			return (
				<li key={comment.timestamp}>
					<div className='comment-header row'>
						<img className='avatar' src={require('../images/avatar.png')} alt='avatar' />
						<div className='column'>
							<h4>{comment.author}</h4>
							<p>{this.milisecToDateTime(comment.timestamp)}</p>
						</div>
					</div>
					<div className='comment-content'>
						<p>{comment.content}</p>
						<ul className='row'>
							<li><button className='like-btn icon button'>like</button></li>
							<li><button className='share-btn icon button'>share</button></li>
							<li><button className='comment-btn icon button'>comment</button></li>
							<li><button className='report-btn icon button'>report</button></li>
						</ul>
					</div>
					<RepliesList 
						videoId={this.props.videoId}
						comment={comment} />
				</li>
			);
		});
	}

	render() {
		return (
			<ul className='comments-list'>
				{this.renderComments()}
			</ul>
		);
	}
}