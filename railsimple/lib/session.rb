require 'json'

class Session
  COOKIE_NAME = "_rails_lite_app"
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    cookie_present = req.cookies[COOKIE_NAME]
    @values = { path: '/' }

    if cookie_present
      @values = JSON.parse(cookie_present)
    else
      @values = {}
    end
  end

  def [](key)
    @values[key]
  end

  def []=(key, val)
    @values[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    json_attrbs = JSON.generate(@values)
    res.set_cookie(COOKIE_NAME, json_attrbs)
  end
end
