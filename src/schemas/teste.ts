import ITeste from '@models/teste'
import mongoose, { Schema } from 'mongoose'

const TesteSchema: Schema = new Schema({
  name: { type: String }
}, {
  timestamps: true
})

export default mongoose.model<ITeste>('Teste', TesteSchema)
