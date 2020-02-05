module ApplicationCable
    class Connection < ActionCable::Connection::Base
        identified_by :connected_user

        def connect
            self.connected_user = find_verified_user
        end

        private

        def find_verified_user
            SecureRandom.urlsafe_base64(5)
        end
    end
end
