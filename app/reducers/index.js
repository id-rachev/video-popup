import { combineReducers } from 'redux';
import CommentsReducer from './reducer_comments';

const rootReducer = combineReducers({
	comments: CommentsReducer
});

export default rootReducer;