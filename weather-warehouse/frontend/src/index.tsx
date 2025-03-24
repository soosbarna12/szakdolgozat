import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AlertProvider } from './utils/AlertContext';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: auto; /* Allow scrolling */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    /* Remove content shift compensation as we no longer have visible scrollbars */
    margin-right: 0;
  }
  
  /* WebKit browsers (Chrome, Safari, newer versions of Opera) */
  html::-webkit-scrollbar {
    display: none;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <AlertProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>
);