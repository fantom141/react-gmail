import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';

// findDOMNode err in DEV mode
const consoleError = console.error.bind(console);
console.error = (err, ...args) => {
  if (typeof err === 'string' && err.includes('ref directly')) {
    return;
  }
  consoleError(err, ...args);
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
