import React from 'react'
import { Link } from 'react-router-dom'

import '../../index.css'

const home = () => {
    return (
        <>
            <h5 className="text-center margin-1">This is the Home Page</h5>

            <p>Choose from below links to navigate to the module</p>

            <ul>
                <li><Link to="/files">File Upload</Link></li>
                <li><Link to="/excel">Export Excel</Link></li>
                <li><Link to="/translate">Internationalization</Link></li>
            </ul>
        </>
    )
}

export default home