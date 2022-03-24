import { Product } from "../product.entity";
import { IsNumber, Min } from "class-validator";

export class ProductGetDto {

	content?: Product[];

	@IsNumber()
	@Min(0)
	page: number


	totalCount: number

	@IsNumber()
	pageSize: number
}
