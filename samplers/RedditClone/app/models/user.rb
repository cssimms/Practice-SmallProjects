class User < ActiveRecord::Base
  after_initialize :ensure_session_token

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}


  def self.validate_login_credentials(username, password)
    user = User.find_by_username(username)
    db_password = BCrypt::Password.new(user.password_digest)
    if user && db_password.is_password?(password)
      user
    else
      nil
    end
  end

  def password=(pass)
    @password = pass
    self.password_digest = BCrypt::Password.create(pass)
  end

  #session_token methods
  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
  end

  private
  attr_reader :password

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
