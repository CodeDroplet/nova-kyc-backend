import db from "..";
import { users } from "../schemas";
import { adminUser, randomUsers } from "./data";
import { hashPassword } from "../../utils/hashPassword";
import { UserRole } from "../../types/users";

async function seed() {
  try {
    console.log("🌱 Starting seeding...");

    // Clear existing data
    await db.delete(users);
    console.log("Cleared existing data");

    // Create admin user
    const hashedAdminPassword = await hashPassword(adminUser.password);
    await db.insert(users).values({
      ...adminUser,
      password: hashedAdminPassword,
    });
    console.log("Created admin user");

    // Create random users
    const randomUsersWithHashedPasswords = await Promise.all(
      randomUsers.map(async (user) => ({
        ...user,
        role: UserRole.USER,
        password: await hashPassword(user.password),
      })),
    );

    await db.insert(users).values(randomUsersWithHashedPasswords);
    console.log("Created random users");

    console.log("✅ Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
