import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cart-item/entities/cart-item.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Order } from '../order/entities/order.entity';
import { Branch } from '../branch/entities/branch.entity';
import { CreateCartDto } from './dto/create-cart.dto'; // Importa el DTO

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async addToCart(createCartDto: CreateCartDto) {
    const { userId, productId, quantity } = createCartDto;

    // Buscar el usuario en el repositorio correcto
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['carts'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Buscar el producto
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Verificar si el usuario ya tiene un carrito
    let cart = user.carts.length > 0 ? user.carts[0] : null;

    if (!cart) {
      // Crear un nuevo carrito si el usuario no tiene uno
      cart = new Cart();
      cart.user = user; // Asociamos el carrito al usuario correctamente
      await this.cartRepo.save(cart);
    }

    // Crear el CartItem
    const cartItem = new CartItem();
    cartItem.cart = cart;
    cartItem.product = product;
    cartItem.quantity = quantity;

    // Guardar el CartItem
    await this.cartItemRepo.save(cartItem);

    return cartItem;
  }

  // Generar orden a partir del carrito
  async generateOrder(userId: number, branchId: any) {
    const cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems'],
    });
    const branch = await this.branchRepo.findOne(branchId);

    const order = new Order();
    order.user = cart.user;
    order.branch = branch;
    order.items = cart.cartItems;
    order.totalAmount = cart.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    order.status = 'pendiente';

    await this.orderRepo.save(order);
    return order;
  }
}
