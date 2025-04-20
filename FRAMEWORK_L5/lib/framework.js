const http = require("http");

class App {
  constructor() {
    this.routes = {};
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  register(method, path, handler) {
    this.routes[`${method.toUpperCase()} ${path}`] = handler;
  }

  get(path, handler) {
    this.register("GET", path, handler);
  }

  post(path, handler) {
    this.register("POST", path, handler);
  }

  put(path, handler) {
    this.register("PUT", path, handler);
  }

  patch(path, handler) {
    this.register("PATCH", path, handler);
  }

  delete(path, handler) {
    this.register("DELETE", path, handler);
  }

  enhanceResponse(res) {
    res.json = (data) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    };

    res.send = (data) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    };

    res.status = (code) => {
      res.writeHead(code);
      return res;
    };
  }

  handleRequest(req, res) {
    this.enhanceResponse(res); 

    const { method, url } = req;
    const route = this.routes[`${method} ${url}`];

    if (!route) {
      return res.status(404).send("Not Found");
    }

    let index = 0;
    const next = () => {
      if (index < this.middlewares.length) {
        return this.middlewares[index++](req, res, next);
      }
      route(req, res);
    };

    next();
  }

  listen(port, callback) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(port, callback);
  }
}

module.exports = App;
