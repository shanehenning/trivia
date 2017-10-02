import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Core, registerServiceWorker } from './components';

ReactDOM.render(<Core />, document.getElementById('root'));
registerServiceWorker();
