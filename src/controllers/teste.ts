// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express'
import Teste from '@schemas/teste'
import mongoose from 'mongoose'

const createTeste = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  const teste = new Teste({
    _id: new mongoose.Types.ObjectId(),
    name
  })

  return teste.save()
    .then(result => {
      return res.status(201).json({
        teste: result
      })
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      })
    })
}

const getAllTeste = (req: Request, res: Response, next: NextFunction) => {
  Teste.find()
    .exec()
    .then(results => {
      return res.status(200).json({
        testes: results,
        count: results.length
      })
    }).catch(error => {
      return res.status(500).json({
        message: error.message,
        error
      })
    })
}

export default { getAllTeste, createTeste }
