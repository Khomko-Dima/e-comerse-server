import { UserRegistrDto } from "./dto/user-registr.dto";
import { User } from "./user.entity";

export interface IUserService {
  createUser: (dto: UserRegistrDto) => Promise<User | null>;
  validateUser: (dto: UserRegistrDto) => Promise<boolean>;
}