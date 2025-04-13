import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('')
  create(@Param('categoryId') categoryId: number, @Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Get(':branchId')
  getByBranch(@Param('categoryId') categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @Delete(':categoryId')
  delete(@Param('categoryId') categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
