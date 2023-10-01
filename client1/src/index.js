import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App'; // App component import

// Get the 'root' DOM element
const root = document.getElementById('root');

// Create a root and render the application using the new `createRoot` API
ReactDOM.createRoot(root).render(<App />);
