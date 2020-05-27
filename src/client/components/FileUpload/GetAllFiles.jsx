import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Grid, Snackbar, Chip, Tooltip } from '@material-ui/core'
import { Alert } from '@material-ui/lab';

import '../../index.css'

const getAllFiles = props => {

    const [allFiles, setAllFiles] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/file/getAll')
            .then(res => {
                setAllFiles(res.data.allFiles)
            }).catch(err => {
                setError(err.response.data)
            })
    }, [])

    const handleClose = () => {
        setError(false)
        setSuccess(false)
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/file/${id}`)
            .then(res => {
                setSuccess(res.data.message)
                setAllFiles(res.data.allFiles)
            }).catch(err => {
                setError(err.response.data)
            })
    }

    const handleClick = (file) => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/file/${file.id}`,
            responseType: 'blob'
        })
            .then(res => {
                console.log('data: ', res.headers)
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${file.name}`)
                document.body.appendChild(link)
                link.click()

            }).catch(err => {
                setError(err.response.data)
            })
    }

    return (
        <>
            <Snackbar
                open={success ? true : false}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success">
                    {success}
                </Alert>
            </Snackbar>

            <Snackbar
                open={error ? true : false}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>

            <Grid container justify="center" className="margin-top-5">
                <Grid item xs={10} sm={8}>
                    <div className="box-shadow">
                        <h5 className="text-center">Get All Files</h5>

                        {allFiles.map(file => {
                            return (
                                <Tooltip title="Click to download"
                                    key={file.id}>
                                    <Chip
                                        className="margin-1"
                                        label={file.name}
                                        onClick={() => handleClick(file)}
                                        onDelete={() => handleDelete(file.id)}
                                    />
                                </Tooltip>
                            )
                        })}
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default getAllFiles