import { ProductCreateDto } from "./dto/product-create.dto";
import { ProductDeleteDto } from "./dto/product-delete.dto";
import { ProductGetDto } from "./dto/product-get.dto";
import { Product } from "./product.entity";

export interface IProductsService {
  createProduct: (dto: ProductCreateDto) => boolean | null;
  deleteProduct: (dto: ProductDeleteDto) => boolean | null;
  getProducts: (dto: ProductGetDto) => ProductGetDto | null;
  getProductsById: (ids: string[]) => Pick<ProductGetDto, "content"> | [];
  getProduct: (id: string) => Product | undefined;
}