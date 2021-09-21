import { Router } from 'express'

import UserController from '@controllers/UserController'
import ReservaController from '@controllers/ReservaController'

const routes = Router()

routes.get('/users', UserController.index)

routes.get('/reservas/getReservas', ReservaController.getReservas)
routes.post('/reservas/cadastraReserva', ReservaController.cadastraResareva)
routes.post('/reservas/deleteReserva', ReservaController.deleteReserva)

export default routes
