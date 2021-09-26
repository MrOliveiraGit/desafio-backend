// eslint-disable-next-line no-unused-vars
import IReserva from '@models/Reserva'
import mongoose, { Schema } from 'mongoose'

const dadosHotel = new Schema({
  nomeHotel: { type: String, require: true }
})
const dadosHospedesSchema = new Schema({
  nomeHospedes: { type: [String], required: true },
  emailHospedes: { type: [String], required: false }
})

export const ReservaSchema = new Schema({
  dadosApartamento: dadosHotel,
  dataCheckin: { type: Date, required: true },
  dataCheckOut: { type: Date, required: true },
  qtdHospedes: { type: Number, required: true },
  dadosHospedes: [dadosHospedesSchema]
}, {
  timestamps: true
})

export default mongoose.model<IReserva>('Reserva', ReservaSchema)
