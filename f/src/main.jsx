import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import  { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './contexts/AuthContext'
import { SocketContextProvider } from './contexts/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
        <Toaster />
      </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
