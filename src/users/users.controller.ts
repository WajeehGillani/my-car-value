import {
  Body,
  Controller,
  Post,
  Param,
  Query,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';

import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userServices.create(body.email, body.password);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userServices.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userServices.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userServices.remove(parseInt(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userServices.update(parseInt(id), body);
  }
}
