import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import ModalRouter from './components/modal-router';
require('./index.css');

const App = () => {
	return (
		<div className='column'>
			<h1>Video-popup task</h1>
			<ModalRouter />
		</div>
	);
}

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>
	, document.getElementById('app'));