import { IProductsRepository } from "./products.repository.interface";
import { Product } from "./product.entity";
import {readFileSync, writeFileSync} from 'fs'
import { injectable } from "inversify";
import { ProductGetDto } from "./dto/product-get.dto";

@injectable()
export class ProductsRepository implements IProductsRepository {
  private readonly path: string
  constructor() {
    this.path = process.cwd() + '/db/db.json';
  }
  create({id, price, title, category, img}: Product): boolean {
      try {
        const products = getFileData(this.path);
        products.push({id, price, title, category, img});
        addToFile(this.path, products)
        return true
      } catch (e) {
        return false
      }
    }
  delete(id: string): boolean {
      try {
        const products = getFileData(this.path);
        addToFile(this.path, products.filter((p: Product) => p.id !== id))
        return true
      } catch (e) {
        return false
      }
    }
  getAll(page: number = 0, pageSize: number = 10): ProductGetDto {
    const products = getFileData(this.path);

    const totalCount = products.length;

    const from = page === 0 ? 0 : page * pageSize;
    const to = from + pageSize >= totalCount ? totalCount : from + pageSize;

    const content = products.slice(from, to)

    return {
      content,
      pageSize,
      totalCount,
      page
    }
  }
  getById(id: string): Product | undefined {
    const products = getFileData(this.path);
    return products.find((product: Product) => product.id === id)
  }

}
function addToFile(path: string, data: any[]) {
  writeFileSync(path, JSON.stringify(data))
}
function getFileData(path: string) {
  const productsFile = readFileSync(path, 'utf8')
  return JSON.parse(productsFile);
}


