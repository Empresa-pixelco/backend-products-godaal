import { Controller, Post, Get, Body } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';

@Controller('veterinaries')
export class VeterinaryController {
  constructor(private veterinaryService: VeterinaryService) {}

  @Post()
  create(@Body() createVeterinaryDto: { name: string; location: string }) {
    return this.veterinaryService.createVeterinary(
      createVeterinaryDto.name,
      createVeterinaryDto.location,
    );
  }

  @Get()
  getAll() {
    return this.veterinaryService.getVeterinaries();
  }
}
