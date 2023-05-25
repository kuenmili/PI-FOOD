import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import React from 'react';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
   <BrowserRouter>
   <App />
  </BrowserRouter> 
 </Provider>
  
);
