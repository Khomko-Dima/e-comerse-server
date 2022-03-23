import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IProductsService } from "./products.service.interface";
import { IProductsRepository } from "./products.repository.interface";
import { Product } from "./product.entity";
import { ProductCreateDto } from "./dto/product-create.dto";

@injectable()
export class ProductsService implements IProductsService {
  constructor(
    @inject(TYPES.ProductsRepository) private productsRepository: IProductsRepository,
  ) {}
  createProduct(product: ProductCreateDto): boolean | null {
    const newProduct = new Product(product.title, product.prise)
    const res = this.productsRepository.create(newProduct)
    if (!res) return null
    else return true
  }
}