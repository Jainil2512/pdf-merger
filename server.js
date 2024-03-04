const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePdf}  = require('./mergedpdf')
const upload = multer({ dest: 'uploads/' })
const port = 3000


app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/indexed.html"))
})

app.post('/merge', upload.array('PDF', 2),async function(req, res, next) {
    console.log(req.files)
    await mergePdf(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))
    res.redirect("http://localhost:3000/static/merged.pdf")
    //res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
//app.post('/', (req, res) => {
    //res.sendFile(path.join(__dirname,"templates/indexed.html"))
  //})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})