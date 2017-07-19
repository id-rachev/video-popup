import { FETCH_COMMENTS, CREATE_COMMENT, CREATE_REPLY } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			return action.payload;

		case CREATE_COMMENT:
			return {...state, [action.payload.timestamp]: action.payload.newComment};

		case CREATE_REPLY:
		 	return {...state, [action.payload.commentId]: action.payload.comment };

		default:
			return state;
	}
}

// https://www.youtube.com/watch?v=Gz5VlDkQUuU

// https://www.youtube.com/watch?v=W0CBzKfvA80
// https://www.youtube.com/watch?v=sWJUsOe2bgY