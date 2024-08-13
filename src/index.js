import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TeamProvider } from './contexts/TeamContext'; // Importez le TeamProvider

ReactDOM.render(
  <React.StrictMode>
    <TeamProvider>
      <App />
    </TeamProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
