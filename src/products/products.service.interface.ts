import { ProductCreateDto } from "./dto/product-create.dto";

export interface IProductsService {
  createProduct: (dto: ProductCreateDto) => boolean | null;
}