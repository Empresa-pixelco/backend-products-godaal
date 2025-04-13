import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branches')
export class BranchController {
  constructor(private branchService: BranchService) { }

  @Post(':veterinaryId')
  create(
    @Param('veterinaryId') veterinaryId: number,
    @Body()
    createBranchDto: {
      name: string;
      location: string;
      contact: string;
      whatsappNumber: string;
    },
  ) {
    return this.branchService.createBranch(
      veterinaryId,
      createBranchDto.name,
      createBranchDto.contact,
      createBranchDto.location,
      createBranchDto.whatsappNumber,
    );
  }

  @Get(':veterinaryId')
  getByVeterinary(@Param('veterinaryId') veterinaryId: number) {
    return this.branchService.getBranchesByVeterinary(veterinaryId);
  }
}
