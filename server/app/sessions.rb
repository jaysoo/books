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
     session_data[:voting_enabled] = true
     Session.create!(session_data)
     json session_data
   end

   put "/sessions/:id" do
     session_data = JSON.parse request.body.read
     session = Session.find(params[:id])
     session.update_attributes(session_data) if session
     json session
   end

   put "/sessions/:id/enable_voting" do
     session = Session.find(params[:id])
     session.update_attributes(voting_enabled: true) if session
     json session
   end

   put "/sessions/:id/disable_voting" do
     session = Session.find(params[:id])
     book_id = book_id_with_highest_votes_for session
     session.update_attributes(
       voting_enabled: false,
       book_id: book_id
     ) if session
     json session
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
     user = User.find(params[:user_id])
     vote = Vote.find_or_create_by(vote_data(params))
     vote.update_attributes({
       user_email: user.email,
       user_first_name: user.first_name,
       user_last_name: user.last_name,
       user_image: user.image
     })
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

   def book_id_with_highest_votes_for session
     grouped = Vote.where(session_id: session.id).group_by do |vote|
       vote.book_id
     end
     grouped_pairs = grouped.to_a.map{ |pair| [pair[0], pair[1].size] }
     sorted_pairs = grouped_pairs.sort_by{ |pair| pair[1] }
     sorted_pairs.last[0]
   end
end
