class App < Sinatra::Application
   get "/books" do
     json Book.all
   end

   get "/books/:ids" do
     ids = params[:ids].split(',')

     results = Book.in(id: ids)

     if ids.size > 1
       json results
     else
       json results.first
     end
   end

   post "/books" do
     book_data = JSON.parse request.body.read
     Book.create!(book_data)
     json book_data
   end

   put "/books/:id" do
     book_data = JSON.parse request.body.read
     book = Book.find(params[:id])
     book.update_attributes(book_data)
     json book
   end

   delete "/books/:id" do
     book = Book.find(params[:id])
     book.delete if book
     status 204
   end
end
