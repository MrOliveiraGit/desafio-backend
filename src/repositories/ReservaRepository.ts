
import Reserva from '@schemas/Reserva'
// eslint-disable-next-line no-unused-vars
import IReserva from '@models/Reserva'
import mongoose from 'mongoose'

class ReservaRepository {
  public async getCheckinByDate (idApartamento, startDate, endDate): Promise<Array<IReserva>> {
    const transaction = await Reserva.find({
      $and: [
        { 'dadosApartamento._id': idApartamento },
        {
          $or: [
            {
              dataCheckin: {
                $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
              }

            }, {
              dataCheckOut: {
                $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
              }
            }

          ]

        }

      ]
    }).sort({ dataCheckin: 'asc' })
    return transaction
  }

  public async checkCreate (idApartamento, starDate, endDate) {
    let check: boolean = true
    await this.getCheckinByDate(idApartamento, starDate, endDate).then(result => {
      check = result.length === 0
    })
    return check
  }

  public async createReserva ({ dadosApartamento, dataCheckin, dataCheckOut, qtdHospedes, dadosHospedes }) {
    const validation = await this.checkCreate(dadosApartamento.id, dataCheckin, dataCheckOut)
    if (validation) {
      const reserva = new Reserva({
        _id: new mongoose.Types.ObjectId(),
        dadosApartamento: {
          nomeHotel: dadosApartamento.nomeApartamento,
          _id: dadosApartamento.id
        },
        dataCheckin,
        dataCheckOut,
        qtdHospedes,
        dadosHospedes
      })
      return reserva.save().then(result => { return { reservaFeita: result } })
    } else return { error: 'conflito de datas' }
  }
}
const reservaRepo = new ReservaRepository()
export default reservaRepo
