import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<User> {
    console.log('name', name)
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    console.log(await this.usersRepository.find());
    console.log('existingUser', existingUser)
    if (existingUser) {
      throw new BadRequestException('El usuario con este correo ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar el usuario');
    }
  }
  async findOneByEmail(email: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
}
