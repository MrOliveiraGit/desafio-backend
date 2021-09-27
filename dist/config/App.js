"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var _reservaRouter = _interopRequireDefault(require("../routes/reservaRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
class App {
  mongoose = _mongoose.default;
  dburi = 'mongodb://mongoContainer:27017/local';

  constructor() {
    this.express = (0, _express.default)();
    this.middlewares();
    this.routes();
    this.database();
    this.docs();
  }

  middlewares() {
    console.log('middlewares initialize');
    this.express.use(_express.default.json());
    this.express.use((0, _cors.default)());
  }

  database() {
    console.log('database initialize');
    this.mongoose.connect(this.dburi, err => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('connected sucess');
      }
    });
  }

  routes() {
    console.log('routes initialize');
    this.express.use(_reservaRouter.default);
  }

  docs() {
    console.log('swagger initalize');
    this.express.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
  }

}

var _default = new App().express;
exports.default = _default;