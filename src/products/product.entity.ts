import { v4 } from 'uuid';
export class Product {
  private readonly _id: string
  constructor(
    private readonly _title: string,
    private readonly _price: number,
  ) {
    this._id = v4()
  }

  get id(): string {
    return this._id
  }
  get title(): string {
    return this._title
  }
  get price(): number {
    return this._price
  }

}