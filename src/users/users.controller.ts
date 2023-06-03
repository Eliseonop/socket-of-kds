import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UsersService } from './users.service'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'
@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}
  @Get()
  async getAllUsers () {
    const users = await this.usersService.getUsers()
    return users
  }

  //signup

  @Post('/signup')
  async addUser (
    @Body('password') userPassword: string,
    @Body('username') userName: string
  ) {
    const user: CreateUserDto = {
      username: userName,
      password: userPassword
    }
    const result = await this.usersService.createUser(user)
    return result
  }
  //Post / Login
  @Post('/login')
  async login (
    @Body('password') userPassword: string,
    @Body('username') userName: string
  ) {
    const user: CreateUserDto = {
      username: userName,
      password: userPassword
    }

    const result = await this.usersService.Login(user)

    return result
  }

  @Get('/logout')
  logout (@Request() req): any {
    req.session.destroy()
    return { msg: 'The user session has ended' }
  }
}
