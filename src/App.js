// Author(s): All
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import LocalResources from './pages/LocalResources';
import OnlineResources from './pages/OnlineResources';
import Chatbot from './components/Chatbot';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import Journal from './pages/Journal';
import JournalEntry from './pages/JournalEntry';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path ="ContactUs" element={<ContactUs />} />
          <Route path = "FAQ" element={<FAQ />} />
          <Route path = "Login" element={<Login />} />
          <Route path = "SignUp" element={<SignUp />} />
          <Route path="OnlineResources" element={<OnlineResources />} />
          <Route path="LocalResources" element={<LocalResources />} />
          <Route path="Dashboard" element={<Dashboard />} />ResetPassword
          <Route path="ResetPassword" element={<ResetPassword />} />
          <Route path = "Journal" element={<Journal />} />
          <Route path = "JournalEntry/:id" element={<JournalEntry />} />
        </Routes>
        
        <Footer />
      </Router>
      <Chatbot />
    </div>
  );
}

export default App;
