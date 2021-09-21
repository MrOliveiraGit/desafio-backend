
import { Reserva } from '@models/Reserva'
import { Request, Response } from 'express'

class ReservaController {
  public static reservas:Array<Reserva> = [
    {
      id: 'c8043a1b-77bc-4f28-8979-b2dc4b69e889',
      nomeApartamento: 'Condominio ceu',
      dataCheckin: new Date(),
      dataCheckOut: new Date(),
      qtdHospedes: 1,
      nomeHospedes: ['teixeira'],
      emailHospedes: ['oliveira@oliveira']
    },
    {
      id: 'a46a33e4-5473-4d6e-b89b-08ac5b873245',
      nomeApartamento: 'Condominio pedra',
      dataCheckin: new Date(),
      dataCheckOut: new Date(),
      qtdHospedes: 1,
      nomeHospedes: ['teixeira'],
      emailHospedes: ['oliveira@oliveira']
    },
    {
      id: 'd9442c78-5976-4c1c-bb83-b751b7aaf2bf',
      nomeApartamento: 'Condominio agua',
      dataCheckin: new Date(),
      dataCheckOut: new Date(),
      qtdHospedes: 1,
      nomeHospedes: ['teixeira'],
      emailHospedes: ['oliveira@oliveira']
    }
  ];

  public async getReservas (req: Request, res:Response): Promise<Response> {
    return res.json(ReservaController.reservas)
  }

  public async cadastraResareva (req:Request, res:Response): Promise<Response> {
    const reserva = new Reserva(req.body)
    ReservaController.reservas.push(reserva)
    return res.json(reserva)
  }

  public async deleteReserva (req:Request, res:Response): Promise<Response> {
    const reserva = ReservaController.reservas.filter(reserva => reserva.id !== req.body.id)
    ReservaController.reservas = reserva
    return res.json(reserva)
  }

  public async editReserva (req:Request, res:Response): Promise<Response> {
    const reserva = ReservaController.reservas.filter(reserva => reserva.id === req.body.id)
    console.log(reserva)
    return res.json(reserva)
  }
}

export default new ReservaController()
