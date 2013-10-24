class User
  attr_accessor :id, :email, :image, :first_name, :last_name

  def initialize attrs
    @id = attrs["id"]
    @email = attrs["email"]
    @image = attrs["image"]
    @first_name = attrs["first_name"]
    @last_name = attrs["last_name"]
  end
end
