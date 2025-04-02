import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  // Crear producto
  async createProduct(productData: Partial<Product>) {
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }

  // Obtener productos por sucursal y categoría
  async getProductsByBranchAndCategory(
    branchId: number,
    categoryId: number,
    page = 1,
    limit = 10
  ) {
    return this.productRepo.find({
      where: {
        branch: { id: branchId },
        category: { id: categoryId },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // Actualizar producto
  async updateProduct(id: number, updateData: Partial<Product>) {
    await this.productRepo.update(id, updateData);
    return this.productRepo.findOneBy({ id });
  }
}
