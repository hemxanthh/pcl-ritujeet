import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Application is starting...');
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

createRoot(rootElement!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
