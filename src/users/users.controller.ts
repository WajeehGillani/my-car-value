import {
  Body,
  Controller,
  Post,
  Param,
  Query,
  Patch,
  Get,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';

import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from './guards/auth.guards';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userServices: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/whoiam')
  @UseGuards(AuthGuard)
  whoIam(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  Signout(@Session() session: any) {
    return (session.userId = null);
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
