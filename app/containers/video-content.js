import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, createComment } from '../actions';
import VideoPlayer from '../components/video-player';
import CommentsList from '../components/comments-list';

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
		return (
			<div>
				<VideoPlayer videoUrl={this.props.videoUrl}/>
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
            		videoId={this.props.videoId}
            		comments={this.props.comments} />
			</div>
		);
	}
}

function mapStateToProps({ comments }) {
	return { comments };
}

export default connect(mapStateToProps, { fetchComments, createComment })(VideoContent);