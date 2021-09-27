"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Reserva = _interopRequireDefault(require("../schemas/Reserva"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReservaRepository {
  async getCheckinByDate(idApartamento, startDate, endDate) {
    const transaction = await _Reserva.default.find({
      $and: [{
        'dadosApartamento._id': idApartamento
      }, {
        $or: [{
          dataCheckin: {
            $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59))
          }
        }, {
          dataCheckOut: {
            $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59))
          }
        }]
      }]
    }).sort({
      dataCheckin: 'asc'
    });
    return transaction;
  }

  async checkCreate(idApartamento, starDate, endDate) {
    let check = true;
    await this.getCheckinByDate(idApartamento, starDate, endDate).then(result => {
      check = result.length === 0;
    });
    return check;
  }

  async createReserva({
    dadosApartamento,
    dataCheckin,
    dataCheckOut,
    qtdHospedes,
    dadosHospedes
  }) {
    const validation = await this.checkCreate(dadosApartamento.id, dataCheckin, dataCheckOut);

    if (validation) {
      const reserva = new _Reserva.default({
        _id: new _mongoose.default.Types.ObjectId(),
        dadosApartamento: {
          nomeHotel: dadosApartamento.nomeApartamento,
          _id: dadosApartamento.id
        },
        dataCheckin,
        dataCheckOut,
        qtdHospedes,
        dadosHospedes
      });
      return reserva.save().then(result => {
        return {
          reservaFeita: result
        };
      });
    } else return {
      error: 'conflito de datas'
    };
  }

}

const reservaRepo = new ReservaRepository();
var _default = reservaRepo;
exports.default = _default;