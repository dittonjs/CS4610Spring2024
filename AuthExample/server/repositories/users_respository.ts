import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateUserPayload = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export class UsersRepository {
  private db: PrismaClient

  constructor(db: PrismaClient) {
    this.db = db;
  }


  async createUser({email, password, firstName, lastName}: CreateUserPayload) {
    return this.db.user.create({
      data: {
        email: email,
        password_hash: bcrypt.hashSync(password),
        firstName: firstName,
        lastName: lastName,
        profile: {
          create: {}
        }
      }
    });
  }

  getUserById() {

  }
}