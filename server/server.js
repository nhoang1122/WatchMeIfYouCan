const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


app.listen(4040,() => console.log(`server running on 4040`))