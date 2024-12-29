import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {ToastContainer} from "react-toastify"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from './reducers.js'

const store=configureStore({
  reducer:rootReducer
})

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
       <BrowserRouter>
          <App />
          <ToastContainer/>
       </BrowserRouter>
    </Provider>
)
