
import Reserva from '@schemas/Reserva'
// eslint-disable-next-line no-unused-vars
import IReserva from '@models/Reserva'

export default class ReservaRepository {
  public async getCheckinByDate (idApartamento, startDate, endDate): Promise<Array<IReserva>> {
    const transaction = await Reserva.find({
      dadosApartamento: {
        _id: idApartamento
      },

      dataCheckin: {
        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59))
      }
    }).sort({ dataCheckin: 'asc' })
    return transaction
  }

  public async checkCreate (idApartamento, starDate, endDate) {
    this.getCheckinByDate(idApartamento, starDate, endDate).then(result => {
      return result.length === 0
    })
  }
}
