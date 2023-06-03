import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './users.model'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser (user: CreateUserDto) {
    const findUser = await this.userModel.findOne({ username: user.username })
    if (findUser)
      return {
        msg: 'User already exists'
      }
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(user.password, salt)

    const newUser = this.userModel.create({
      username: user.username.toLowerCase(),
      password: hash
    })

    return newUser
  }
  async Login (userLogin: CreateUserDto) {
    const username = userLogin.username.toLowerCase()
    const user = await this.userModel.findOne({ username })
    if (!user)
      return {
        msg: 'User not found'
      }
    const validPassword = bcrypt.compareSync(userLogin.password, user.password)

    if (!validPassword)
      return {
        msg: 'Invalid password'
      }
   
    return {
      msg: 'User logged in',
      user: {
        id: user._id,
        username: user.username
      }
    }
  }

  async getUsers () {
    const users = await this.userModel.find().exec()
    return users.map(user => ({
      id: user.id,
      username: user.username,
      password: user.password
    }))
  }
}
