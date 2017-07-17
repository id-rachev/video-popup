import React, { Component } from 'react';
import getVideoId from 'get-video-id';
import VideoContent from './video-content';

export default class ModalContent extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videoUrl: '',
			videoId: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(ev) {
		const inputValue = ev.target.value;
		const videoId = getVideoId(inputValue) ? getVideoId(inputValue).id : '';
		this.setState({
			videoUrl: inputValue,
			videoId: videoId
		});
	}

	render() {
		const matched = this.props.match;
		const videoId = this.state.videoId;
	    return (
	        <div>
	            {matched ?
	                <p>
	                    {`(This view is accessed through direct url link: "${matched.path}")`}
	                </p>
	                : null
	            }
	            {videoId ? null
	            	: <input
		            	type="text"
		            	placeholder='Enter video url from youtube'
		            	onChange={this.onInputChange}
		            	value={this.state.videoUrl} />
	            }
	            {videoId ? <VideoContent videoId={videoId} /> : null}
	        </div>
	    );
	}
}