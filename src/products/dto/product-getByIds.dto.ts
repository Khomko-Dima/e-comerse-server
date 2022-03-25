
import { IsArray } from "class-validator";

export class ProductGetByIdsDto {

	@IsArray()
	ids: string[]

}
