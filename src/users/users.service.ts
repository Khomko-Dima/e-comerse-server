import { IUsersService } from "./users.service.interface";
import { UserRegistrDto } from "./dto/user-registr.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "./user.entity";
import { injectable } from "inversify";

@injectable()
export class UsersService implements IUsersService {
  async createUser({email, name, password}: UserRegistrDto): Promise<User | null> {
    const newUser = new User(email, name)
    await newUser.setPassword(password)

    return null
  }
  async validateUser({}: UserLoginDto): Promise<boolean> {
    return true
  }
}