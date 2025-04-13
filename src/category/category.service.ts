import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async createCategory(name: string) {
    const existingCategory = await this.categoryRepo.findOne({
      where: { name },
    });
    if (existingCategory) {
      throw new BadRequestException('La categoría ya existe con este nombre');
    }
    const category = this.categoryRepo.create({ name });
    return await this.categoryRepo.save(category);
  }

  async getCategoryById(categoryId: number) {
    try {
      const category = await this.categoryRepo.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener la categoría');
    }
  }
  async getAllCategories() {
    try {
      const categories: any = await this.categoryRepo.find();
      console.log('categories', categories);
      if (!categories) {
        throw new BadRequestException('No existen categorías disponibles');
      }
      return categories;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Error al obtener las categorías');
    }
  }
  async deleteCategory(categoryId: number) {
    try {
      const category = await this.categoryRepo.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
      await this.categoryRepo.remove(category);
      return { message: 'Categoría eliminada con éxito' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la categoría');
    }
  }
}
