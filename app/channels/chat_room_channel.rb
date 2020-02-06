class ChatRoomChannel < ApplicationCable::Channel
    def subscribed
        stream_from "chat_room"
    end

    def unsubscribed
        # Any cleanup needed when channel is unsubscribed
    end

    def chat(data)
        data = JSON.parse(data['content'])
        ActionCable.server.broadcast(
            "chat_room",
            type:  'chat_broadcast',
            data: {
                message: data['message'],
                sender: data['sender'],
                sender_id: data['sender_id']
            }
        )
    end
end
