import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your custom CSS
import 'antd/dist/reset.css'; // Import Ant Design styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './redux/store';
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store = {store}>
       <React.StrictMode>
        <App />
    </React.StrictMode>
    </Provider>
   
  );
}

reportWebVitals();
