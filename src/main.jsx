import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { WorkProvider } from './context/WorkContext';
import App from './App.jsx'
import './index.css'
import './cms-previews.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkProvider>
        <App />
      </WorkProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
