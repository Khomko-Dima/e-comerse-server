import { IProductsRepository } from "./products.repository.interface";
import { Product } from "./product.entity";
import {readFileSync, writeFileSync} from 'fs'
import { injectable } from "inversify";

@injectable()
export class ProductsRepository implements IProductsRepository {
    private path: string
    constructor() {
      this.path = process.cwd() + '/db/db.json';
    }
    create({id, price, title, category, img}: Product): boolean {
      try {
        const productsFile = readFileSync(this.path, 'utf8');
        const products = JSON.parse(productsFile);
        products.push({id, price, title, category, img});
        addToFile(this.path, JSON.stringify(products))
        return true
      } catch (e) {
        return false
      }
    }
    delete(id: string): boolean {
      try {
        const productsFile = readFileSync(this.path, 'utf8')
        const products = JSON.parse(productsFile)
        addToFile(this.path, JSON.stringify(products.filter((p: Product) => p.id !== id)))
        return true
      } catch (e) {
        return false
      }
    }

}
function addToFile(path: string, data: string) {
  writeFileSync(path, data)
}


