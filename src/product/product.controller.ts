import { Controller, Post, Get, Put, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() productData) {
    return this.productService.createProduct(productData);
  }

  @Get('/:categoryId')
  getByBranchAndCategory(
    // @Param('branchId') branchId: number,
    @Param('categoryId') categoryId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.productService.getProductsByBranchAndCategory(
      // branchId,
      categoryId,
      page,
      limit,
    );
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData) {
    return this.productService.updateProduct(id, updateData);
  }
}
