const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.static('.'))

app.get('/catalogData', (req, res) => {
    fs.readFile(
      "catalog.json",
      "utf-8",
      (err, data) => {
        res.send(data);
      }
    );
})

app.listen(3000, function () {
    console.log('server is running on port 3000!')
})

