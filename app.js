var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3003;
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

app.use(bodyParser.json());
app.use(express.static('./public'));

const assistant = new AssistantV1({
    username: '7f11e061-5901-4b89-89ec-cb285e18a0a8',
    password: 'fXeDRAIHnocG',
    url: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2018-02-16'
});

app.post('/conversation/', (req, res) => {
    const { text, context = {} } = req.body;
    //console.log(app);
    const params = {
        input: { text },
        workspace_id: '2df2206a-e7f5-4820-b554-2921353d01ee',
        context
    };

    assistant.message(params, (err, response) => {
        if (err) res.status(500).json(err);

        res.json(response);
    });
});

app.listen(port);
console.log('Servidor rodando em ', port);