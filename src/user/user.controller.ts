import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('api/v1/users')
@UseGuards(JwtAuthGuard)
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
  getAllUsers(): Promise<ResponseUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Delete('/:id')
  async deleteUser(@Param('id') id: String) {
    return this.userService.deleteUser(id);
  }
  @Put('/:id')
  async updateUser(
    @Param('id') id: String,
    @Body() responseUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, responseUserDto);
  }
}
