import { UserRole } from "../types/users";
import { users, UserType } from "../db/schemas/user";
import db from "../db";
import { eq, getTableColumns } from "drizzle-orm";
import _ from "lodash";
import { kycRequests } from "../db/schemas";
export type SafeUserType = Omit<typeof UserType, "password">;

class User {
  static async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): Promise<SafeUserType> {
    const [{ id: userID }] = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        password,
        role,
      })
      .$returningId();

    const newUser = await this.findOne(userID);

    if (!newUser) {
      throw new Error("User not found");
    }

    return newUser;
  }

  static async findOne(id: number): Promise<SafeUserType | undefined> {
    const user = await db
      .select({
        ..._.omit(getTableColumns(users), "password"),
        kycRequestsStatus: kycRequests.status,
      })
      .from(users)
      .leftJoin(kycRequests, eq(users.id, kycRequests.userId))
      .where(eq(users.id, id));

    if (!user.length) {
      return undefined;
    }
    return user[0];
  }

  static async findOneByEmail(email: string): Promise<typeof UserType | undefined> {
    const user = await db
      .select({
        ...getTableColumns(users),
        kycRequestsStatus: kycRequests.status,
      })
      .from(users)
      .leftJoin(kycRequests, eq(users.id, kycRequests.userId))
      .where(eq(users.email, email));

    if (!user.length) {
      return undefined;
    }
    return user[0];
  }

  static async findAll(): Promise<Omit<typeof UserType, "password">[]> {
    const res = await db
      .select({
        ..._.omit(getTableColumns(users), "password"),
        kycRequestsStatus: kycRequests.status,
      })
      .from(users)
      .leftJoin(kycRequests, eq(users.id, kycRequests.userId));
    return res;
  }
}

export default User;
