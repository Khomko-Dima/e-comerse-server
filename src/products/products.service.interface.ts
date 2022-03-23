import { ProductCreateDto } from "./dto/product-create.dto";
import { ProductDeleteDto } from "./dto/product-delete.dto";

export interface IProductsService {
  createProduct: (dto: ProductCreateDto) => boolean | null;
  deleteProduct: (dto: ProductDeleteDto) => boolean | null;
}