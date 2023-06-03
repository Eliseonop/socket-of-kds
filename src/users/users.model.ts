import * as mongoose from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import bcrypt from 'bcrypt'

@Schema({
  timestamps: true
})
export class User {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({
    required: true,
  })
  password: string

  @Prop({ default: false })
  isLoging: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
