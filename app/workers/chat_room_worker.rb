class ChatRoomWorker
    include Sidekiq::Worker

    def perform(message, sender, sender_id)
        ActionCable.server.broadcast(
            "chat_room",
            type:  'chat_broadcast',
            data: {
                message: message,
                sender: sender,
                sender_id: sender_id
            }
        )
    end
end