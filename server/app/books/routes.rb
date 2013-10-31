class App < Sinatra::Application
   get "/books" do
     json Book.all
   end

   post "/books" do
     book_data = JSON.parse request.body.read
     Book.create!(book_data)
     json book_data
   end
end
