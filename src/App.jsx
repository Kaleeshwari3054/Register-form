import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactForm from './ContactForm';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
