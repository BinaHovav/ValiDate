import mongoose, { Document, Schema } from 'mongoose'

interface User extends Document {
  _id: any
  email: string
  bio: string
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  bio: { type: String, required: true },
})

const User = mongoose.model<User>('User', userSchema)

export { User }
