import { Router } from 'express'
import teste from '@controllers/teste'
const Testeroutes = Router()

Testeroutes.get('/teste/', teste.getAllTeste)
Testeroutes.get('/teste/create', teste.createTeste)

export default Testeroutes
