import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import'bootstrap/dist/css/bootstrap.min.css'

import App from './components/App.jsx'

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,
document.getElementById('root'))