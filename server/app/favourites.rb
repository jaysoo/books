class App < Sinatra::Application
   get "/favourites" do
     json Favourite.all
   end

   get "/favourites/:user_id/:book_id" do
     json Favourite.where(fav_data(params)).first
   end

   put "/favourites/:user_id/:book_id" do
     data = fav_data(params)
     fav = Favourite.new(data)
     fav.upsert
     json data
   end

   delete "/favourites/:user_id/:book_id" do
     fav = Favourite.where(fav_data(params)).first
     fav.delete if fav
     status 204
     json ''
   end

   private

   def fav_data params
     { user_id: params[:user_id], book_id: params[:book_id] }
   end
end
