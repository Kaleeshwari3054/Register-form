import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactForm from './Pages/Form';
import Adminpage from './Pages/Adminpage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<ContactForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
         <Route path="/" element={<ContactForm />} />
        <Route path="/admin-dashboard" element={<Adminpage />} />
      </Routes>
    </div>
  );
}

export default App;
