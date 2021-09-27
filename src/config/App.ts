// eslint-disable-next-line no-unused-vars
import express, { Request, Response } from 'express'
import cors from 'cors'
import moongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '@config/swagger.json'
import ReservasRouter from '../routes/reservaRouter'

class App {
  public express: express.Application;
  public mongoose = moongoose
  public dburi:string = 'mongodb://mongoContainer:27017/local'
  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
    this.database()
    this.docs()
  }

  private middlewares (): void {
    console.log('middlewares initialize')
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database ():void {
    console.log('database initialize')
    this.mongoose.connect(this.dburi, (err: any) => {
      if (err) {
        console.log(err.message)
      } else {
        console.log('connected sucess')
      }
    })
  }

  private routes (): void {
    console.log('routes initialize')
    this.express.use(ReservasRouter)
  }

  private docs (): void {
    console.log('swagger initalize')
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }
}

export default new App().express
