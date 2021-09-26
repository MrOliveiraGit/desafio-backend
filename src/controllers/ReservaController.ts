
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Reserva from '@schemas/Reserva'
import ReservaRepository from 'src/repositories/ReservaRepository'

class ReservaController {
  private reservaRepo:ReservaRepository = new ReservaRepository()

  public async getReservas (req: Request, res:Response): Promise<Response> {
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

  public async createReserva (req: Request, res: Response): Promise<Response> {
    const { dadosApartamento, dataCheckin, dataCheckOut, qtdHospedes, dadosHospedes } = req.body

    if (this.reservaRepo.checkCreate(dadosApartamento.id, dataCheckin, dataCheckOut)) {
      const reserva = new Reserva({
        _id: new mongoose.Types.ObjectId(),
        dadosApartamento,
        dataCheckin,
        dataCheckOut,
        qtdHospedes,
        dadosHospedes
      })

      return reserva.save().then(result => {
        return res.status(201).json({
          reserva: result
        })
      }).catch(error => {
        return res.status(500).json({
          message: error.message,
          error
        })
      })
    } else {
      return res.status(400).json({
        message: 'Conflito de datas'
      })
    }
  }

  public getReservasById (req: Request, res: Response): Promise<Response> {
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

  public deleteReserva (req: Request, res: Response): Promise<Response> {
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

  public updateReserva (req: Request, res: Response): Promise<Response> {
    const { id, nomeApartamento, dataCheckin, dataCheckOut, qtdHospedes, dadosHospedes } = req.body

    Reserva.findByIdAndUpdate(id, { nomeApartamento, dataCheckin, dataCheckOut, qtdHospedes, dadosHospedes })
      .exec()
      .then(result => {
        return res.status(204).json({
          message: result
        })
      }).catch(error => {
        return res.status(500).json({
          message: error.message,
          error
        })
      })
  }

  public getByDate (req: Request, res: Response): Promise<Response> {
    const { idApartamento, startDate, endDate } = req.body

    this.reservaRepo.getCheckinByDate(idApartamento, startDate, endDate).then(result => {
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
}

export default new ReservaController()
