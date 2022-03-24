import { Product } from "./product.entity";
import { ProductGetDto } from "./dto/product-get.dto";


export interface IProductsRepository {
    create: (product: Product) => boolean;
    delete: (id: string) => boolean;
    getAll: (page: number, limit: number) => ProductGetDto;
    getById: (id: string) => Product | undefined;
}