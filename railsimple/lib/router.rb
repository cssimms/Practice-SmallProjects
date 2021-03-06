class Route
  attr_reader :pattern, :http_method, :controller_class, :action_name

  def initialize(pattern, http_method, controller_class, action_name)
    @pattern = pattern
    @method = http_method
    @controller_class = controller_class
    @action_name = action_name
  end

  # checks if pattern matches path and method matches request method
  def matches?(req)
    req_method = req.request_method
    req_path = req.path
    if req_method_match?(req_method) && path_match?(req_path)
      true
    else
      false
    end
  end

  # use pattern to pull out route params (save for later?)
  # instantiate controller and call controller action
  def run(req, res)
    match_data = @pattern.match(req.path)
    params = {}
    if match_data
      match_data.names.each do |name|
        params[name] = match_data[name]
      end
    end

    controller = controller_class.new(req, res, params)
    controller.invoke_action(@action_name)
  end

  private
  def req_method_match?(method)
    @method == method.downcase.to_sym
  end

  def path_match?(path)
    @pattern =~ path
  end
end

class Router
  attr_reader :routes

  def initialize
    @routes = []
  end

  # simply adds a new route to the list of routes
  def add_route(pattern, method, controller_class, action_name)
    @routes << Route.new(pattern, method, controller_class, action_name)
  end

  # evaluate the proc in the context of the instance
  # for syntactic sugar :)
  def draw(&proc)
    self.instance_eval(&proc)
  end

  # make each of these methods that
  # when called add route
  [:get, :post, :put, :delete].each do |http_method|
    define_method(http_method) do |pattern, method, controller_class|
      add_route(pattern, method, controller_class, http_method)
    end
  end

  # should return the route that matches this request
  def match(req)
    @routes.each do |route|
      return route if route.matches?(req)
    end
    nil
  end

  # either throw 404 or call run on a matched route
  def run(req, res)
    route = self.match(req)
    if route
      route.run(req,res)
    else
      res.write("No Route Matches Request")
      res.status = 404
    end
  end
end
