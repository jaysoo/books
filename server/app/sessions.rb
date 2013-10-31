class App < Sinatra::Application
   get "/sessions" do
     json Session.all
   end

   get "/sessions/:ids" do
     ids = params[:ids].split(',')
     json [Session.send(:find, *ids)].compact
   end

   post "/sessions" do
     session_data = JSON.parse request.body.read
     Session.create!(session_data)
     json session_data
   end

   delete "/sessions/:id" do
     session = Session.find(params[:id])
     session.delete if session
     status 204
     json ''
   end


   # Voting
   get "/sessions/:session_id/votes" do
     json Votes.where(session_id: params[:session_id])
   end

   put "/sessions/:session_id/votes/:book_id" do
     data = vote_data(params)
     vote = Vote.new(data)
     vote.upsert
     json data
   end

   delete "/sessions/:session_id/votes/:book_id" do
     session = Session.where(session_data(params)).first
     session.delete if session
     status 204
     json ''
   end

   private

   def vote_data params
     {session_id: params[:session_id], book_id: [:book_id]}
   end
end
