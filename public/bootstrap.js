const getWatsonMessageAndInsertTemplate = async (text = '') => {
    const uri = 'http://localhost:3003/conversation/';

    const response = await (await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text,
            context,
        }),
    })).json();

    context = response.context;

    const template = templateChatMessage(response.output.text, 'watson');

    InsertTemplateInTheChat(template);
};
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'user';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.textInput');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }

            $('.textInput').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.textInput').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        /*         sendMessage('Hello Philip! :)');
                setTimeout(function () {
                    return sendMessage('Hi Sandy! How are you?');
                }, 1000);
                return setTimeout(function () {
                    return sendMessage('I\'m fine, thank you!');
                }, 2000); */
        sendMessage('user');
    });

    //**************************** chatbot ***************************** */

    $(function () {
        let context = {};
        const chat = document.getElementById('chat_window');
        var getMessageTextFromWatson, message_side, sendMessageWatson;
        message_side = 'watson';

        // Crate a Element and append to chat
        const InsertTemplateInTheChat = (template) => {
            const div = document.createElement('div');
            div.innerHTML = template;

        };
        const getWatsonMessageAndInsertTemplate = async (text = '') => {
            const uri = 'http://localhost:3003/conversation/';

            const response = await (await fetch(uri, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    context,
                }),
            })).json();

            context = response.context;

            const template = Message(response.output.text, 'watson');

            InsertTemplateInTheChat(template);
        };

        getMessageTextFromWatson = function () {
            getWatsonMessageAndInsertTemplate();
        };
        sendMessageWatson = function (text) {
            var $messages, message;
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        sendMessageWatson('watson');
        sendMessageWatson(response);
    });
}.call(this));