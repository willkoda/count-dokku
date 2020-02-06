App.scripts.chat_room = function lecture_schedule_group()  {
    // var sock = new WebSocket('ws://localhost:3000/cable');
    var sock = new WebSocket('ws://157.245.159.121/cable');
    sock.onopen = () => {
        var sub = JSON.stringify({"command" : "subscribe", "identifier" : JSON.stringify({
            "channel": "ChatRoomChannel"})});    
        sock.send(sub);
    };

    sock.onmessage = (event) => {
        var broadcast = JSON.parse(event['data'])['message'];
        if (broadcast && broadcast['type'] == 'chat_broadcast') {
            Chat.update_messages(broadcast['data'])
        }
    }

    this.send_message = function() {
        Chat.send_message();
    }

    const Chat = (function() {
        const dom_parser = new DOMParser();
        const sender_id = Math.random();

        let element = {
            chat_input: document.querySelector('#chat-message'),
            chat_messages: document.querySelector('div.chat--section__messages'),
            sender: document.querySelector('input#nickname')
        }

        return {
            send_message: function() {
                var content = {
                    message: element.chat_input.value,
                    sender: element.sender.value,
                    sender_id: sender_id
                }
            
                var data = JSON.stringify({
                    content: JSON.stringify(content),
                    action: "chat",
                }); 
            
                var id = JSON.stringify({"channel": "ChatRoomChannel"})
                var request = {
                    command: 'message',
                    identifier: id,
                    data: data
                };
        
                sock.send(JSON.stringify(request));
            },
            update_messages: function(data) {
                let template = `<div class="message">
                    <div class="username">Sender: ${data.sender}</div>
                    <div class="content">Message: ${data.message}</div>
                </div>`

                let doc = dom_parser.parseFromString(template, 'text/html');
                element.chat_messages.appendChild(doc.body.firstChild);

                if (data.sender_id == sender_id) {
                    element.chat_input.value = '';
                }
            }
        }
    }).call(this);
}
