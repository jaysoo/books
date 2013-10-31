class App < Sinatra::Application
   %w(get post).each do |method|
    send(method, "/auth/:name/callback") do
      auth = request.env['omniauth.auth']
      user_data = {
        "id" => auth.uid,
        "first_name" => auth.info.first_name,
        "last_name" => auth.info.last_name,
        "email" => auth.info.email,
        "image" => auth.info.image
      }

      if is_nulogy_user? auth.info.email
        UserRepository.create(user_data)
        session[:user_id] = user_data["id"]
        redirect "/#access_token=#{session[:session_id]}"
      else
        redirect "/#login_failure=not_nulogy_user"
      end
    end
  end

   get "/identity" do
     user_id = session[:user_id]
     if user_id
       json UserRepository.get(user_id)
     else
       json nil
     end
   end

   post "/logout" do
     session.clear
   end

   private

   def is_nulogy_user? email
     email.end_with? 'nulogy.com'
   end
end
