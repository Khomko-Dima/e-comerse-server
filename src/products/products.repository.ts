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
  getAll(params: Omit<ProductGetDto, 'content' | 'totalCount' >): ProductGetDto {
    let products = getFileData(this.path);

    if (params.filterData) {
      if (params.filterData.price?.length) {
        const start = params.filterData.price[0]
        const end = params.filterData.price[1]
        products = products.filter((el: Product) => el.price >= start && el.price <= end)
      }
      if (params.filterData.searchString) {
        const value = params.filterData.searchString.trim();
        if (value !== '') {
          const searchString = new RegExp(value, 'i')
          products = products.filter((el: Product) => searchString.test(el.title))
        }
      }
      if (params.filterData.category?.length) {
        products = products.filter((el: Product) => {
          if (!params.filterData) return;
          return contains(el.category as string[], params.filterData.category as string[])
        })
      }
    }

    const totalCount = products.length;
    const from = params.page === 0 ? 0 : params.page * params.pageSize;
    const to = from + params.pageSize >= totalCount ? totalCount : from + params.pageSize;
    const content = products.slice(from, to)
    return {
      content,
      pageSize: params.pageSize,
      totalCount,
      page: params.page
    }
  }
  getById(id: string): Product | undefined {
    const products = getFileData(this.path);
    return products.find((product: Product) => product.id === id)
  }
  getByIds(ids: string[]): Pick<ProductGetDto, 'content'> | [] {
    let products = getFileData(this.path);
    return products.filter((el: Product) => ids.includes(el.id))
  }

}
function addToFile(path: string, data: any[]) {
  writeFileSync(path, JSON.stringify(data))
}
function getFileData(path: string) {
  const productsFile = readFileSync(path, 'utf8')
  return JSON.parse(productsFile);
}

function contains(where: string[], what: string[]){
  for(let i=0; i < what.length; i++){
    if(where.indexOf(what[i]) == -1) return false;
  }
  return true;
}
