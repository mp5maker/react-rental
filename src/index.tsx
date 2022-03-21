import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import RentalContextProvider from './redux/rental/context'
import 'antd/dist/antd.css'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <RentalContextProvider>
      <App />
    </RentalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()