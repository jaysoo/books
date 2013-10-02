require 'sinatra'


class App < Sinatra::Application
  enable :sessions

  configure :production do
    set :haml, { :ugly=>true }
    set :clean_trace, true
  end

  configure :development do
  end

  helpers do
    include Rack::Utils
    alias_method :h, :escape_html
  end
end


require_relative 'domain/init'
require_relative 'ports/persistence/rethinkdb_adaptor/init'
require_relative 'routes'
