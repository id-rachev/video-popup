import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('./index.css');
import ModalRouter from './components/modal-router';

ReactDOM.render(	
	<div className='column'>
		<h1>Video-popup task</h1>
		<ModalRouter />
	</div>
	, document.getElementById('app')
);