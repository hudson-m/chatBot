let context = {};
const chat = document.getElementById('chatBox');

const templateChatMessage = (message, from) => `
    <div class="grom-${from}">
        <div class="message-inner">
            <p>${message}</p>
        </div>    
    </div>
`;

const InsertTemplateInTheChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;

    chat.appendChild(div);
};

const getWatsonMessageAndInsertTemplate = async (text = '') => {
    const uri = 'http://localhost:3003/conversation/';
    const response = await (await fetch(uri,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            text,
            context: {"username": getAllUrlParams().nome}
        })
    })).json();
    context = response.context;

    const template = templateChatMessage(response.output.text, 'watson');

    InsertTemplateInTheChat(template);
}