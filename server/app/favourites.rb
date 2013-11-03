class App < Sinatra::Application
   get "/favourites" do
     json Favourite.all
   end

   get "/favourites/:user_id/:book_id" do
     json isFavourited: Favourite.where(fav_data(params)).exists?
   end

   put "/favourites/:user_id/:book_id" do
     fav = Favourite.find_or_create_by(fav_data(params))
     json fav
   end

   delete "/favourites/:user_id/:book_id" do
     fav = Favourite.where(fav_data(params)).first
     fav.delete if fav
     status 204
   end

   private

   def fav_data params
     { user_id: params[:user_id], book_id: params[:book_id] }
   end
end
