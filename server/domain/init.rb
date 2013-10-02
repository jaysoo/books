# encoding: utf-8


[]
  .concat(Dir["books/*.rb"])
  .concat(Dir["identity/*.rb"])
  .each {|file| require File.basename(file) }
