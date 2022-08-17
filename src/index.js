import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';
import config from "./config.json";
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        redirectUri={config.redirectUri}
        audience={config.audience}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);