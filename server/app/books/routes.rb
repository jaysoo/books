class App < Sinatra::Application
   get "/books/?" do
     json BooksRepository.all
   end
end
