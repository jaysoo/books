require "auth0"
require "omniauth"
require "sinatra"
require "sinatra/json"
require "firebase_token_generator"


use OmniAuth::Builder do
  provider :auth0, ENV["AUTH0_CLIENT_ID"], ENV["AUTH0_CLIENT_SECRET"], ENV["AUTH0_DOMAIN"]
end


class App < Sinatra::Application
  set :session_secret, ENV["RACK_SESSION_SECRET"]
  set :sessions, true
  set :firebase_secret, ENV["FIREBASE_SECRET"]
  set :json_encoder, :to_json

  configure :production do
    set :show_exceptions, false
  end

  configure :development do
    require "sinatra/reloader"
    require "pry"

    register Sinatra::Reloader

    set :root, File.dirname(__FILE__)

    set :public_folder, Proc.new { File.join(root, "..", "client", "app") }

    get "/styles/:file" do |file|
      send_file File.join(settings.root, "..", ".tmp", "styles", file)
    end
  end

  get "/?" do
    File.read("#{settings.public_folder}/index.html")
  end
end


require_relative "domain/init"
require_relative "ports/persistence/rethinkdb_adaptor/init"
require_relative "routes"
