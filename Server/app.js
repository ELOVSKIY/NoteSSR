const express = require('express')
const ejs = require('ejs');
const fs = require("fs");
const util = require('util')
const app = express()
const port = 3000

// использование движка ejs
app.set('view engine', 'ejs')
// использование статических элементов
app.use(express.static('public'))
// добавление виртаульного каталога (префикса)
app.use('/static', express.static('public'));
// используется относительный путь к текущему файлу, так что можно и так
app.use('/static', express.static(__dirname + '/public'));


app.get('/add', (req, res) => {
    let file_content = fs.readFileSync('data/tasks.json', 'utf-8')
    let objs = JSON.parse(file_content)
    // let task = {title: req.title, date: req.date, description: req.description}
    let task = {"title": "req.title", "date": "req.date", "description": "req.description"}
    objs.push(task)
    fs.writeFileSync('data/tasks.json', JSON.stringify(objs), "utf-8")
})


app.get('/list', (req, res) => {
    let file_content = fs.readFileSync('data/tasks.json', 'utf-8')
    let objs = JSON.parse(file_content)
    res.render('partials/task', { tasks: objs})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
