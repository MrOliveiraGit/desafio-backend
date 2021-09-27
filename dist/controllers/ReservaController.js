"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Reserva = _interopRequireDefault(require("../schemas/Reserva"));

var _ReservaRepository = _interopRequireDefault(require("../repositories/ReservaRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
class ReservaController {
  async getReservas(req, res) {
    _Reserva.default.find().exec().then(result => {
      return res.status(200).json({
        reservas: result,
        count: result.length
      });
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
  }

  async createReserva(req, res) {
    _ReservaRepository.default.createReserva(req.body).then(result => {
      return res.status(200).json(result);
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
  }

  getReservasById(req, res) {
    const {
      id
    } = req.body;

    _Reserva.default.findById(id).exec().then(result => {
      return res.status(200).json({
        reserva: result
      });
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
  }

  deleteReserva(req, res) {
    const {
      id
    } = req.body;

    _Reserva.default.findByIdAndDelete(id).exec().then(result => {
      return res.status(204).json({
        message: 'resource deleted successfully'
      });
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
  }

  updateReserva(req, res) {
    const {
      id,
      dadosApartamento,
      dataCheckin,
      dataCheckOut,
      qtdHospedes,
      dadosHospedes
    } = req.body;

    _Reserva.default.findByIdAndUpdate(id, {
      dadosApartamento,
      dataCheckin,
      dataCheckOut,
      qtdHospedes,
      dadosHospedes
    }, (error, result) => {
      if (error) {
        res.status(500).json({
          message: error.message,
          error
        });
      } else {
        res.status(200).json({
          reservaAlterada: result
        });
      }
    });
  }

  getByDate(req, res) {
    const {
      idApartamento,
      startDate,
      endDate
    } = req.body;

    _ReservaRepository.default.getCheckinByDate(idApartamento, startDate, endDate).then(result => {
      return res.status(200).json({
        reservasInRage: result
      });
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
  }

  deleteAll(req, res) {
    const {
      deleteAll
    } = req.body;

    if (deleteAll) {
      _Reserva.default.remove({}, () => {
        console.log('removendo tudo');
      });

      return res.status(200).json({
        message: 'banco todo apagado'
      });
    }
  }

}

var _default = new ReservaController();

exports.default = _default;