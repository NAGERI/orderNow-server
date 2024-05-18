import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('/user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}
  private logger = new Logger('UserService');

  @Get('/:searchString')
  getFilteredUsers(
    @Param('searchString') searchString: string,
  ): Promise<ResponseUserDto[]> {
    this.logger.log(`search string : ${searchString}`);
    return this.userService.getUsers({
      where: {
        username: { contains: searchString },
      },
    });
  }

  @Get()
  getUsers(): Promise<ResponseUserDto[]> {
    return this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: Number) {
    return this.userService.deleteUser(Number(id));
  }
  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() responseUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, responseUserDto);
  }
}
