
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import Reserva from '@schemas/Reserva'
import ReservaRepository from '../repositories/ReservaRepository'

class ReservaController {
  public async getReservas (req: Request, res:Response) {
    Reserva.find()
      .exec()
      .then(result => {
        return res.status(200).json({
          reservas: result,
          count: result.length
        })
      }).catch(error => {
        return res.status(500).json({
          message: error.message,
          error
        })
      })
  }

  public async createReserva (req: Request, res: Response) {
    ReservaRepository.createReserva(req.body).then(result => {
      return res.status(200).json(result)
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      })
    })
  }

  public getReservasById (req: Request, res: Response) {
    const { id } = req.body
    Reserva.findById(id)
      .exec()
      .then(result => {
        return res.status(200).json({
          reserva: result
        })
      }).catch(error => {
        return res.status(500).json({
          message: error.message,
          error
        })
      })
  }

  public deleteReserva (req: Request, res: Response) {
    const { id } = req.body
    Reserva.findByIdAndDelete(id)
      .exec()
      .then(result => {
        return res.status(204).json({
          message: 'resource deleted successfully'
        })
      }).catch(error => {
        return res.status(500).json({
          message: error.message,
          error
        })
      })
  }

  public updateReserva (req: Request, res: Response) {
    const { id, dadosApartamento, dataCheckin, dataCheckOut, qtdHospedes, dadosHospedes } = req.body
    Reserva.findByIdAndUpdate(id, {
      dadosApartamento,
      dataCheckin,
      dataCheckOut,
      qtdHospedes,
      dadosHospedes
    }, (error, result) => {
      if (error) {
        res.status(500).json({ message: error.message, error })
      } else {
        res.status(200).json({ reservaAlterada: result })
      }
    })
  }

  public getByDate (req: Request, res: Response) {
    const { idApartamento, startDate, endDate } = req.body

    ReservaRepository.getCheckinByDate(idApartamento, startDate, endDate).then(result => {
      return res.status(200).json({
        reservasInRage: result
      })
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      })
    })
  }

  public deleteAll (req: Request, res: Response) {
    const { deleteAll } = req.body
    if (deleteAll) {
      Reserva.remove({}, () => { console.log('removendo tudo') })
      return res.status(200).json({
        message: 'banco todo apagado'
      })
    }
  }
}

export default new ReservaController()
