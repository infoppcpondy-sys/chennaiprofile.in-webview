import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Home from './home.jsx'
import Contact from './ContactUs.jsx'
import Registration from './Registration.jsx'
import Detail from './Detail.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import AboutUs from './AboutUs.jsx'
import TermsAndConditions from './TermsAndConditions.jsx'
import Search from './search.jsx'
import './index.css'
import './i18n.js'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
