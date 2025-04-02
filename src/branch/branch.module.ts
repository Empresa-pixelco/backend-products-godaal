import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { VeterinaryModule } from 'src/veterinary/veterinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Branch]), VeterinaryModule],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService, TypeOrmModule], // Exportamos TypeOrmModule para que BranchRepository sea accesible
})
export class BranchModule {}
