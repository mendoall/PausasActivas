import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom'; // Cambia el nombre de BrowserRouter a Router
import App from './App';

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <QueryClientProvider client={queryClient}>
        <Router> {/* Cambia BrowserRouter a Router y colócalo aquí */}
            <App />
        </Router>
    </QueryClientProvider>
);