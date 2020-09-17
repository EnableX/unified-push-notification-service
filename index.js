const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.SERVICE_PORT || 3456;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
