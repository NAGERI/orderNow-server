import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateUserDto, ResponseUserDto } from './dto/user.dto';
import { Response } from 'express';

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
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.userService.createUser(createUserDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ result });
    }
    return res.status(HttpStatus.CREATED).json({ result });
  }
  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: Number,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.deleteUser(Number(id));
    if (result instanceof Error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: result });
    }
    return res.status(HttpStatus.NO_CONTENT);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: Number,
    @Body() responseUserDto: ResponseUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const { role } = responseUserDto;

    const result = await this.userService.updateUser({
      where: { id: Number(id) },
      data: { role },
    });

    if (result instanceof Error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: result });
    }
    return res.status(HttpStatus.OK).json({ result });
  }
}
