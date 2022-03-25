import { Product } from "./product.entity";
import { ProductGetDto } from "./dto/product-get.dto";


export interface IProductsRepository {
    create: (product: Product) => boolean;
    delete: (id: string) => boolean;
    getAll: (params: Omit<ProductGetDto, 'content' | 'totalCount' >) => ProductGetDto;
    getById: (id: string) => Product | undefined;
    getByIds: (ids: string[]) => Pick<ProductGetDto, 'content'> | [];
}