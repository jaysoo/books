root = ::File.dirname(__FILE__)


[]
  .concat(Dir["#{root}/books/*.rb"])
  .concat(Dir["#{root}/identity/*.rb"])
  .each { |file| require file }
