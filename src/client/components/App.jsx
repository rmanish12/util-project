import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Files from './FileUpload'
import ExportExcel from './ExportExcel'

const App = () => {
    return (
        <>
            <Switch>
                <Route path="/files" exact component={Files} />
                <Route path="/excel" exact component={ExportExcel} />
                <Route path="/" exact component={Home} />
            </Switch>
        </>
    )
}

export default App