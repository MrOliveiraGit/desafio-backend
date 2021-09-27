"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ReservaController = _interopRequireDefault(require("../controllers/ReservaController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReservasRouter = (0, _express.Router)();
ReservasRouter.get('/reserva/', _ReservaController.default.getReservas);
ReservasRouter.post('/reserva/byId', _ReservaController.default.getReservasById);
ReservasRouter.post('/reserva/getByDate', _ReservaController.default.getByDate);
ReservasRouter.post('/reserva/create', _ReservaController.default.createReserva);
ReservasRouter.delete('/reserva/delete', _ReservaController.default.deleteReserva);
ReservasRouter.post('/reserva/update', _ReservaController.default.updateReserva);
ReservasRouter.post('/reserva/deleteAll', _ReservaController.default.deleteAll);
var _default = ReservasRouter;
exports.default = _default;