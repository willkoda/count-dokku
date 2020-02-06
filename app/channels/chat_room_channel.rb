class ChatRoomChannel < ApplicationCable::Channel
    def subscribed
        stream_from "chat_room"
    end

    def unsubscribed
        # Any cleanup needed when channel is unsubscribed
    end

    def chat(data)
        data = JSON.parse(data['content'])
        message = data['message']
        sender = data['sender']
        sender_id = data['sender_id']
        ChatRoomWorker.perform_async(message, sender, sender_id)
    end
end
