require 'sinatra'


class App < Sinatra::Application
  configure :production do
  end

  configure :development do
    puts "In development mode"

    set :root, File.dirname(__FILE__)

    set :public_folder, Proc.new { File.join(root, "..", "client", "app") }

    get "/styles/:file" do |file|
      send_file File.join(settings.root, "..", ".tmp", "styles", file)
    end
  end

  get '/' do
    redirect '/index.html'
  end
end


require_relative 'domain/init'
require_relative 'ports/persistence/rethinkdb_adaptor/init'
require_relative 'routes'
