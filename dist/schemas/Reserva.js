"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReservaSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line no-unused-vars
const dadosHotel = new _mongoose.Schema({
  nomeHotel: {
    type: String,
    require: true
  }
});
const dadosHospedesSchema = new _mongoose.Schema({
  nomeHospedes: {
    type: [String],
    required: true
  },
  emailHospedes: {
    type: [String],
    required: false
  }
});
const ReservaSchema = new _mongoose.Schema({
  dadosApartamento: dadosHotel,
  dataCheckin: {
    type: Date,
    required: true
  },
  dataCheckOut: {
    type: Date,
    required: true
  },
  qtdHospedes: {
    type: Number,
    required: true
  },
  dadosHospedes: [dadosHospedesSchema]
}, {
  timestamps: true
});
exports.ReservaSchema = ReservaSchema;

var _default = _mongoose.default.model('Reserva', ReservaSchema);

exports.default = _default;