import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import 'app/assets/styles/alert.css';
import { configureStore } from './app/store/redux';
import { persistStore } from 'redux-persist';

const { PUBLIC_URL } = process.env;

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <App store={store} persistor={persistor} basename={PUBLIC_URL} />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
