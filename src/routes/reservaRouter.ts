import { Router } from 'express'
import ReservaController from '@controllers/ReservaController'
const ReservasRouter = Router()

ReservasRouter.get('/reserva/', ReservaController.getReservas)
ReservasRouter.post('/reserva/byId', ReservaController.getReservasById)
ReservasRouter.post('/reserva/getByDate', ReservaController.getByDate)

ReservasRouter.post('/reserva/create', ReservaController.createReserva)
ReservasRouter.delete('/reserva/delete', ReservaController.deleteReserva)
ReservasRouter.post('/reserva/update', ReservaController.updateReserva)
ReservasRouter.post('/reserva/deleteAll', ReservaController.deleteAll)

export default ReservasRouter
