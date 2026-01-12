import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<div style="color:red">Error: Root element not found</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Application failed to start:", error);
  rootElement.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif; color: #ef4444; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 0.5rem; margin: 2rem;">
      <h2 style="font-weight: bold; margin-bottom: 1rem;">Something went wrong</h2>
      <p>The application failed to start.</p>
      <pre style="background: rgba(0,0,0,0.05); padding: 1rem; border-radius: 0.25rem; margin-top: 1rem; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
    </div>
  `;
}