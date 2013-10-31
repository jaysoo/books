class App < Sinatra::Application
   get "/books" do
     json BooksRepository.all
   end

   post "/books" do
     book_data = JSON.parse request.body.read
     json BooksRepository.create book_data
   end
end
