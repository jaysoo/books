require "auth0"
require "omniauth"
require "sinatra"
require "sinatra/json"
require "mongoid"
require "firebase_token_generator"


use OmniAuth::Builder do
  provider :auth0, ENV["AUTH0_CLIENT_ID"], ENV["AUTH0_CLIENT_SECRET"], ENV["AUTH0_DOMAIN"]
end


class App < Sinatra::Application
  set :session_secret, ENV["RACK_SESSION_SECRET"]
  set :sessions, true
  set :firebase_secret, ENV["FIREBASE_SECRET"]
  set :json_encoder, :to_json

  Mongoid.load!("#{File.dirname(__FILE__)}/config/mongoid.yml", ENV["RACK_ENV"])

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


# Domain models
require_relative "domain/init"

# Submodules
require_relative 'app/books'
require_relative 'app/favourites'
require_relative 'app/identity'
require_relative 'app/sessions'
