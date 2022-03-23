import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IProductsService } from "./products.service.interface";
import { IProductsRepository } from "./products.repository.interface";
import { Product } from "./product.entity";
import { ProductCreateDto } from "./dto/product-create.dto";
import { ProductDeleteDto } from "./dto/product-delete.dto";

@injectable()
export class ProductsService implements IProductsService {
  constructor(
    @inject(TYPES.ProductsRepository) private productsRepository: IProductsRepository,
  ) {}
  createProduct(product: ProductCreateDto): boolean | null {
    const newProduct = new Product(product.title, product.prise, product.category, product.img)
    const res = this.productsRepository.create(newProduct)
    if (!res) return null
    else return true
  }
  deleteProduct({id}: ProductDeleteDto): boolean | null {
    const res = this.productsRepository.delete(id)
    if (!res) return null
    else return true
  }
}