import { Product } from "./product.entity";


export interface IProductsRepository {
    create: (product: Product) => boolean;
    delete: (id: string) => boolean;
}