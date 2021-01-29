const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000

// использование статических элементов
app.use(express.static('public'))
// добавление виртаульного каталога (префикса)
app.use('/static', express.static('public'));
// используется относительный путь к текущему файлу, так что можно и так
app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    let people = ['geddy', 'neil', 'alex'];
    let html = ejs.render('<% if (user) { %>\n' +
        '  <h2><%= user.name %></h2>\n' +
        '<% } %>', {people: people});
    res.send('<script src="ejs.js"></script>\n' +
        '<script>\n' +
        '  let people = [\'geddy\', \'neil\', \'alex\'];\n' +
        '  let html = ejs.render(\'<%= people.join(", "); %>\', {people: people});\n' +
        '</script>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})