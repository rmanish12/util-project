const excel = require('exceljs')

const generateExcel = async (req, res) => {
    
    try {
        const fileName = 'Users.xlsx'

        const allUsers = req.body.allUsers

        const workbook = new excel.Workbook()
        const worksheet = workbook.addWorksheet('Sheet1')

        worksheet.columns = [
            {header: 'First Name', key: 'firstName'},
            {header: 'Last Name', key: 'lastName'},
            {header: 'Age', key: 'age'}
        ]

        allUsers.map(user => {
            worksheet.addRow({firstName: user.firstName, lastName: user.lastName, age: user.age})
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        workbook.xlsx.write(res).then(() => {
            res.end()
        })

    }catch(err) {
        console.error(`Error while generating excel ${err}`)
        return res.status(500).send('Something went wrong. Please try again.')
    }
}

module.exports = generateExcel