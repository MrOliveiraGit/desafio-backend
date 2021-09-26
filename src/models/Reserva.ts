// eslint-disable-next-line no-unused-vars
import { Document } from 'mongoose'

export default interface IReserva extends Document {
  nomeApartamento: {
    nomeApartamento: String
  }
  dataCheckin: Date
  dataCheckOut: Date
  qtdHospedes: number
  dadosHospedes: {
    nomesHospedes: [string],
    emailHospedes: [string]
  }
}
