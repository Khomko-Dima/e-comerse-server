import { IProductsRepository } from "./products.repository.interface";
import { Product } from "./product.entity";
import {readFileSync, writeFileSync} from 'fs'
import { injectable } from "inversify";

@injectable()
export class ProductsRepository implements IProductsRepository {
    constructor() {}
    create(product: Product): boolean {
      console.log('asd', product);
      try {
        const path = process.cwd() + '/db/test.json'
        console.log(process.cwd());
        console.log(process.cwd() + '/db/test.json');
        const productsFile = readFileSync(path, 'utf8')
        console.log(productsFile);
        const products = JSON.parse(productsFile)
        products.push(product)
        writeFileSync('test.json', JSON.stringify(products))
        return true
      } catch (e) {
        return false
      }
    }
    delete(id: string): boolean {
      try {
        const productsFile = readFileSync('test.json', 'utf8')
        const products = JSON.parse(productsFile)
        writeFileSync('test.json', JSON.stringify(products.filter((p: Product) => p.id !== id)))
        return true
      } catch (e) {
        return false
      }
    }

}