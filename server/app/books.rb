class App < Sinatra::Application
   get "/books" do
     json Book.all
   end

   get "/books/:ids" do
     ids = params[:ids].split(',')

     results = Book.send(:find, *ids)

     json results
   end

   post "/books" do
     book_data = JSON.parse request.body.read
     Book.create!(book_data)
     json book_data
   end

   delete "/books/:id" do
     book = Book.find(params[:id])
     book.delete if book
     status 204
   end
end
