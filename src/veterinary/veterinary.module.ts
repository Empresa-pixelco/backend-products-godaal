import { Module } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { VeterinaryController } from './veterinary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinary } from './entities/veterinary.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Veterinary])],
  controllers: [VeterinaryController],
  providers: [VeterinaryService],
  exports: [VeterinaryService, TypeOrmModule],
})
export class VeterinaryModule {}
