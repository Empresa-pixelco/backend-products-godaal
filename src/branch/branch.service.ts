import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { Veterinary } from '../veterinary/entities/veterinary.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    @InjectRepository(Veterinary)
    private veterinaryRepo: Repository<Veterinary>,
  ) { }

  async createBranch(
    veterinaryId: number,
    name: string,
    contact: string,
    location: string,
    whatsappNumber: string,
  ) {
    const veterinary = await this.veterinaryRepo.findOne({
      where: { id: veterinaryId },
    });
    if (!veterinary) {
      throw new Error('Veterinaria no encontrada');
    }
    const branch = this.branchRepo.create({
      name,
      location,
      veterinary,
      contact,
      whatsappNumber,
    });
    return this.branchRepo.save(branch);
  }

  async getBranchesByVeterinary(veterinaryId: number) {
    return this.branchRepo.find({
      where: { veterinary: { id: veterinaryId } },
    });
  }
}
