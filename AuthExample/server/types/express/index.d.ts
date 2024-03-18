import { PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "../../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: User
      jwtPayload?: JwtPayload
    }
  }
}
