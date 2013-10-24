class Book
  attr_accessor :id, :author, :title, :download_url

  def initialize attrs
    @id = attrs["id"]
    @author = attrs["author"]
    @title = attrs["title"]
    @download_url = attrs["download_url"]
  end
end
