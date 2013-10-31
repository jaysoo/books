class App < Sinatra::Application
   get "/sessions" do
     json Session.order_by(:created_at.desc)
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
     json Vote.where(session_id: params[:session_id])
   end

   put "/sessions/:session_id/votes/:book_id/:user_id" do
     vote = Vote.find_or_create_by(vote_data(params))
     json vote
   end

   delete "/sessions/:session_id/votes/:book_id/:user_id" do
     vote = Vote.where(vote_data(params)).first
     vote.delete if vote
     status 204
     json ''
   end

   private

   def vote_data params
     {
       session_id: params[:session_id],
       book_id: params[:book_id],
       user_id: params[:user_id]
     }
   end
end
