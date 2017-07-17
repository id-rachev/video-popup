import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createReply } from '../actions';
import _ from 'lodash';

class RepliesList extends Component {

	submitReply(ev) {
		ev.preventDefault();
		const reply = ev.target.reply.value;
		ev.target.reply.value = '';
		this.props.createReply(
			this.props.videoId, this.props.comment.timestamp, reply);
	}

	milisecToDateTime(timestamp) {
		const dateTime = new Date(timestamp).toDateString()
			+ ' AT ' + new Date(timestamp).toLocaleTimeString();
		return dateTime;
	}

	renderReplies(replies) {
		return _.map(replies, reply => {
			return (
				<li key={reply.timestamp}>
					<div className='reply-header'>
						<img src='' alt='avatar' />
						<h4>{reply.author}</h4>
						<p>{this.milisecToDateTime(reply.timestamp)}</p>
					</div>
					<p>{reply.content}</p>
				</li>
			);
		});
	}

	render() {
		return (
			<div>
				<ul className='replies-list'>
					{this.renderReplies(this.props.comment.replies)}
				</ul>
				<div className='comment-reply'>
					<ul>
						<li>comment</li>
						<li>photo</li>
						<li>feedback</li>
					</ul>
					<form onSubmit={this.submitReply.bind(this)}>
		        		<input
			            	type='text'
			            	name='reply'
			            	placeholder='Reply...' />
		        	</form>
				</div>
			</div>
		);
	}
}

export default connect(null , { createReply })(RepliesList);