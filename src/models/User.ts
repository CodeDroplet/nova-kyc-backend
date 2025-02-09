import { UserRole } from "../types/users";
import { users, UserType } from "../db/schemas/user";
import db from "../db";
import { eq, getTableColumns } from "drizzle-orm";
import { lower } from "../utils/lower";
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
  ): Promise<typeof UserType> {
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

    const newUser = await db.select().from(users).where(eq(users.id, userID));

    if (!newUser.length) {
      throw new Error("User not found");
    }

    return newUser[0];
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
    const user = await db.query.users.findFirst({
      where: eq(lower(users.email), email.toLowerCase()),
    });

    return user;
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
