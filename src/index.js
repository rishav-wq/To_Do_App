import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root')); // Create a root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

