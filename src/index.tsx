import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import './index.scss'
import i18n from './locale'
import LanguageContextProvider from './redux/language/context'
import RentalContextProvider from './redux/rental/context'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <RentalContextProvider>
      <I18nextProvider i18n={i18n}>
        <LanguageContextProvider>
          <App />
        </LanguageContextProvider>
      </I18nextProvider>
    </RentalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
