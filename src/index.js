import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_DOMAIN}
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={process.env.REACT_APP_REDIRECT_URI}
        audience={process.env.REACT_APP_AUDIENCE}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
   </React.StrictMode> 
);