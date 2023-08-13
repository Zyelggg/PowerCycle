// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import './App.css'
import FAQ from './pages/FAQ';
import Feedback from './components/Feedback';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Payment from "./pages/Checkout";


const App = () => {
  return (
    <div className='body'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
