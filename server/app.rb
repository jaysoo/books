require "auth0"
require "omniauth"
require "sinatra"
require "sinatra/reloader"
require "pry"

use OmniAuth::Builder do
  provider :auth0, ENV["AUTH0_CLIENT_ID"], ENV["AUTH0_CLIENT_SECRET"], ENV["AUTH0_DOMAIN"]
end


class App < Sinatra::Application
  set :session_secret, ENV["RACK_SESSION_SECRET"]
  set :sessions, true

  configure :production do
    set :show_exceptions, false
  end

  configure :development do
    register Sinatra::Reloader

    set :root, File.dirname(__FILE__)

    set :public_folder, Proc.new { File.join(root, "..", "client", "app") }

    get "/styles/:file" do |file|
      send_file File.join(settings.root, "..", ".tmp", "styles", file)
    end
  end

   %w(get post).each do |method|
    send(method, "/auth/:name/callback") do                                                                                             
      auth = request.env['omniauth.auth']
      session[:access_token] = auth.uid
      redirect "/#accessToken=#{auth.credentials.token}"
    end
  end

  get "/?" do
    File.read("#{settings.public_folder}/index.html")
  end
end


require_relative "domain/init"
require_relative "ports/persistence/rethinkdb_adaptor/init"
require_relative "routes"
