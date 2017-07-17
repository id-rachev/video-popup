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
					<div className='comment-header'>
						<img src='' alt='avatar' />
						<h4>{comment.author}</h4>
						<p>{this.milisecToDateTime(comment.timestamp)}</p>
					</div>
					<div className='comment-content'>
						<p>{comment.content}</p>
						<ul>
							<li><button className='like-btn'>like</button></li>
							<li><button className='share-btn'>share</button></li>
							<li><button className='comment-btn'>comment</button></li>
							<li><button className='report-btn'>report</button></li>
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
			<ul>
				{this.renderComments()}
			</ul>
		);
	}
}