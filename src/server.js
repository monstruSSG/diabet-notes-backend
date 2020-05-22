const express = require('express')

let app = express()

app.listen(process.env.PORT || 9000, () => console.log(`App listening on ${process.env.PORT || 9000}`))
