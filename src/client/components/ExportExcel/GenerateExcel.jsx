import React from 'react'
import autobind from 'react-autobind'
import axios from 'axios'

import { Grid, TextField, Fab, Button, Tooltip } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import '../../index.css'

const ROW = {
    firstName: '',
    lastName: '',
    age: ''
}

class GenerateExcel extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            totalRow: [ROW]
        }

        autobind(this)
    }

    addRow() {
        const { totalRow } = this.state
        totalRow.push(ROW)

        this.setState({
            totalRow
        })
    }

    onClick() {
        console.log('rows: ', this.state)

        axios({
            method: 'post',
            url: 'http://localhost:8000/excel/download',
            data: {
                allUsers: this.state.totalRow
            },
            responseType: 'blob'
        }).then(res => {

            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'User.xlsx')
            document.body.appendChild(link)
            link.click()

        }).catch(err => {
            console.log(err)
        })
    }

    onDelete(index) {
        const { totalRow } = this.state

        if (totalRow.length > 1) {
            totalRow.splice(index, 1)

            this.setState({ totalRow })
        }
    }

    onChange(e, index) {
        const name = e.target.name
        const value = e.target.value

        const { totalRow } = this.state

        const newArray = [...totalRow]

        newArray[index] = {
            ...newArray[index],
            [name]: value
        }

        this.setState({ totalRow: newArray })
    }

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={10} sm={10}>

                        <div className="file-upload-heading">
                            <h2>React Generate Excel</h2>
                        </div>

                        <div className="box-shadow">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>Last Name</TableCell>
                                            <TableCell>Age</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {this.state.totalRow.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <TextField
                                                            id="firstName"
                                                            label=" Enter First Name"
                                                            name="firstName"
                                                            value={row.firstName}
                                                            onChange={(e) => this.onChange(e, index)}
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <TextField
                                                            id="lastName"
                                                            label="Enter Last Name"
                                                            name="lastName"
                                                            value={row.lastName}
                                                            onChange={(e) => this.onChange(e, index)}
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <TextField
                                                            id="age"
                                                            label="Enter Age"
                                                            type="number"
                                                            name="age"
                                                            value={row.age}
                                                            onChange={(e) => this.onChange(e, index)}
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <Tooltip title="Click to remove row">
                                                            <Fab color="secondary" size="small" onClick={() => this.onDelete(index)}>
                                                                <DeleteIcon />
                                                            </Fab>
                                                        </Tooltip>

                                                        {index === this.state.totalRow.length - 1 &&
                                                            <Tooltip title="Click to add row">
                                                                <Fab color="default" size="small" onClick={this.addRow} className="add-row-button">
                                                                    <AddIcon />
                                                                </Fab>
                                                            </Tooltip>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Button variant="contained" color="primary" className="width-100 margin-top-5" onClick={this.onClick}>Generate Excel</Button>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default GenerateExcel