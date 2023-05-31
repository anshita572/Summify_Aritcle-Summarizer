import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import {store} from './services/store'
// import {Theme} from './dark_mode'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    {/* <Theme/> */}
    </Provider>
  </React.StrictMode>,
)
