import React, { useState } from 'react'
import axios from 'axios'

import { Grid, Button, Snackbar } from '@material-ui/core'
import { Form, ProgressBar } from 'react-bootstrap'
import { Alert } from '@material-ui/lab';

import '../../index.css'

const fileUpload = props => {

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState('Choose a file')
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const onClick = e => {

        setSuccess(false)
        setError(false)

        const formData = new FormData()
        formData.append('file', file)

        axios.post('http://localhost:8000/file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
            }
        }).then(res => {
            setSuccess(res.data.message)
        }).catch(err => {
            setError(err.response.data)
        })
    }

    const onChange = e => {
        console.log('uploaded')
        const file = e.target.files[0]
        console.log(file)
        setFileName(file.name)
        setFile(file)
    }

    const handleClose = () => {
        setSuccess(false)
        setError(false)
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

            <Grid container justify="center">
                <Grid item xs={10} sm={8}>
                    <div className="file-upload-heading">
                        <h2>React File Upload</h2>
                    </div>

                    <Form>
                        <Form.File
                            id="file-upload"
                            label={fileName}
                            lang="en"
                            custom
                            onChange={onChange}
                        />
                    </Form>

                    <ProgressBar
                        striped
                        variant="success"
                        now={uploadPercentage}
                        label={uploadPercentage}
                        className="file-upload-progress-bar"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        className="width-100 margin-top-5"
                        onClick={onClick}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default fileUpload