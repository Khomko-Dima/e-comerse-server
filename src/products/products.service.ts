import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IProductsService } from "./products.service.interface";
import { IProductsRepository } from "./products.repository.interface";
import { Product } from "./product.entity";
import { ProductCreateDto } from "./dto/product-create.dto";
import { ProductDeleteDto } from "./dto/product-delete.dto";
import { ProductGetDto } from "./dto/product-get.dto";

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
  getProducts(params: Omit<ProductGetDto, 'content' | 'totalCount' >) : ProductGetDto | null {
    const result = this.productsRepository.getAll(params)
    if (!result) return null
    return result
  }
  getProduct(id: string): Product | undefined {
    return this.productsRepository.getById(id)
  }
  getProductsById(ids: string[]): Pick<ProductGetDto, 'content'> | [] {
    const result = this.productsRepository.getByIds(ids)
    return result
  }
}