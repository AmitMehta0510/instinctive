
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toast'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './app/store.js';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer position='top-center' delay={3000} />
  </Provider>,
)
