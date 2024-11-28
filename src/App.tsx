import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Customers from './pages/Customers';
import Queues from './pages/Queues';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="customers" element={<Customers />} />
          <Route path="queues" element={<Queues />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;