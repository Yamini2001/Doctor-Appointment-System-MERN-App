import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your custom CSS
import 'antd/dist/reset.css'; // Import Ant Design styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

reportWebVitals();
