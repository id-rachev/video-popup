export const FETCH_COMMENTS = 'fetch_comments';
export const CREATE_COMMENT = 'create_comment';
export const CREATE_REPLY = 'create_reply';

export function fetchComments(videoId) {
	const comments = JSON.parse(localStorage.getItem(videoId)) || {};

	return {
		type: FETCH_COMMENTS,
		payload: comments
	};
}

export function createComment(videoId, comment) {
	const timestamp = Date.now();
	var comments = JSON.parse(localStorage.getItem(videoId)) || {};

	const newComment = 
		{
			timestamp: timestamp,
			author: "Stoyan Daskaloff",
			content: comment,
			replies: []
		};
	comments[timestamp] = newComment;
	localStorage.setItem(videoId, JSON.stringify(comments));

	return {
		type: CREATE_COMMENT,
		payload: {timestamp, newComment}
	};
}

export function createReply(videoId, commentId, reply) {
	const timestamp = Date.now();
	var comments = JSON.parse(localStorage.getItem(videoId)) || {};

	const newReply = 
		{
			timestamp: timestamp,
			author: "Stoyan Daskaloff",
			content: reply
		};
	comments[commentId].replies.push(newReply);
	const comment = comments[commentId];
	localStorage.setItem(videoId, JSON.stringify(comments));

	return {
		type: CREATE_REPLY,
		payload: {commentId, comment}
	};
}