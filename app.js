var express = require('express');

var app = express();
var port = 3001;

app.use(express.static('public'));

app.get('/',function(req, res){
    res.render('index');
});

app.listen(port);
console.log('Servidor rodando em ',port);