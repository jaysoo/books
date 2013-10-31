class App < Sinatra::Application
   get "/books" do
     json Book.all
   end

   get "/books/:ids" do
     ids = params[:ids].split(',')
     results = Book.send(:find, *ids)

     if results.kind_of?(Array)
       json results
     else
       json [results]
     end
   end

   post "/books" do
     book_data = JSON.parse request.body.read
     Book.create!(book_data)
     json book_data
   end
end
