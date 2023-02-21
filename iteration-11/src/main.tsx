import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Homepage} from './components/Homepage';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
);
