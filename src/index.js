import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/App.css';
import { App, registerServiceWorker } from './components';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
