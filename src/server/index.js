const app = require('./app')

const PORT = process.env.APP_PORT

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))