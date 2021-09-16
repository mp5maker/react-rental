import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import RentalContextProvider from './redux/rental/context'

ReactDOM.render(
  <React.StrictMode>
    <RentalContextProvider>
      <App />
    </RentalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
