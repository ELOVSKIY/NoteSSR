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


app.get('/list', (req, res) => {
    let file_content = fs.readFileSync('data/tasks.json', 'utf-8')
    let objs = JSON.parse(file_content)
    res.render('partials/task', {tasks: objs})
})

app.get('/add', (req, res) => {
    let file_content = fs.readFileSync('data/tasks.json', 'utf-8')
    let objs = JSON.parse(file_content)
    var id = 1
    if (objs.length !== 0) {
        let obj = objs[objs.length - 1]
        let objId = obj.id
        id = objId + 1
    }
    let description = req.query.description
    let task = {"id": id, "description": description.toString()}
    objs.push(task)
    fs.writeFileSync('data/tasks.json', JSON.stringify(objs), "utf-8")
    res.render('partials/task', {tasks: objs})
})

app.get('/remove', (req, res) => {
    let id = req.query.id
    let file_content = fs.readFileSync('data/tasks.json', 'utf-8')
    let objs = JSON.parse(file_content)
    for (var key in objs) {
        let obj = objs[key]
        if (obj.id == id) {
            objs.splice(key, 1)
        }
    }
    fs.writeFileSync('data/tasks.json', JSON.stringify(objs), "utf-8")
    res.render('partials/task', {tasks: objs})
})

app.get('/removeAll', (req, res) => {
    let objs = [];
    fs.writeFileSync('data/tasks.json', JSON.stringify(objs), "utf-8")
    res.render('partials/task', {tasks: objs})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
