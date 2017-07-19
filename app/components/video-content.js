import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, createComment } from '../actions';
import CommentsList from './comments-list';

class VideoContent extends Component {

	componentDidMount() {
		this.props.fetchComments(this.props.videoId);
	}

	submitComment(ev) {
		ev.preventDefault();
		const comment = ev.target.comment.value;
		ev.target.comment.value = '';
		this.props.createComment(this.props.videoId, comment);
	}

	render() {
		const videoId = this.props.videoId;
		const videoSrc = `https://www.youtube.com/embed/${videoId}`;
		return (
			<div>
				<div className='video-wrapper'>
	            	<iframe
	            		className='video-player'
	            		width='100%'
	            		height='454'
	            		src={videoSrc}
	            		frameBorder='0' >
	        		</iframe>
        		</div>
        		<div className='row'>
        			<ul>
        				<button className='like-btn icon button'>like</button>
        				<button className='share-btn icon button'>share</button>
        			</ul>
        			<ul>
        				<button className='edit-btn button'>edit</button>
        				<button className='delete-btn button'>delete</button>
        			</ul>
        		</div>
        		<form onSubmit={this.submitComment.bind(this)}>
	        		<input
		            	type='text'
		            	name='comment'
		            	placeholder='comment...' />
            	</form>
            	<CommentsList 
            		videoId={videoId}
            		comments={this.props.comments} />
			</div>
		);
	}
}

function mapStateToProps({ comments }) {
	return { comments };
}

export default connect(mapStateToProps, { fetchComments, createComment })(VideoContent);