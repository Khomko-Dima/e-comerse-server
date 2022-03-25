
import { IsString } from "class-validator";

export class ProductGetByIdDto {

	@IsString()
	id: string

}
