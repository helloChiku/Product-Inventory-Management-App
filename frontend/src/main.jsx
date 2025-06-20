import 'react-phone-input-2/lib/style.css';
import { createRoot } from 'react-dom/client'
import {ProductProvider} from './context/productContext.jsx'
import './index.css'
import App from './App.jsx'
import 'react-responsive-pagination/themes/classic-light-dark.css';


createRoot(document.getElementById('root')).render(
  
    <ProductProvider><App/></ProductProvider>
   
 
)
