import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Home from './home.jsx'
import Contact from './ContactUs.jsx'
import Registration from './Registration.jsx'
import Detail from './Detail.jsx'
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
