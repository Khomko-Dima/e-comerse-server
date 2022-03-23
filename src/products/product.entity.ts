import { v4 } from 'uuid';
export class Product {
  private readonly _id: string
  private readonly _img: string | null
  constructor(
    private readonly _title: string,
    private readonly _price: number,
    private readonly _category: string[],
    img?: string,
  ) {
    this._id = v4()
    if (img) {
      this._img = img
    } else this._img = null
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
  get category(): string[] {
    return this._category
  }
  get img(): string | null {
    return this._img
  }
}