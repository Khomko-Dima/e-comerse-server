import { IsString } from "class-validator";

export class ProductDeleteDto {
	@IsString()
	id: string;
}
