import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veterinary } from './entities/veterinary.entity';

@Injectable()
export class VeterinaryService {
  constructor(
    @InjectRepository(Veterinary) private veterinaryRepo: Repository<Veterinary>,
  ) {}

  async createVeterinary(name: string, location: string) {
    const veterinary = this.veterinaryRepo.create({ name, location });
    return this.veterinaryRepo.save(veterinary);
  }

  async getVeterinaries() {
    return this.veterinaryRepo.find();
  }
}
