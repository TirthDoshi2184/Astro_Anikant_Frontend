import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AstrologyNavbar from './Components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    {/* {<AstrologyNavbar />} */}
      <App />
    </BrowserRouter>
  // </StrictMode>,
)
