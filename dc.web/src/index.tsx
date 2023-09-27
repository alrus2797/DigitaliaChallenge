import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { routes } from './routes';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log('Interceptor error', error);
  if (error.response.status === 401) {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return Promise.reject(error);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router = {routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
