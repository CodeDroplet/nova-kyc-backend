import { UserRole } from "../../types/users";

export const adminUser = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  password: "admin123",
  role: UserRole.ADMIN,
};

export const randomUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "password123",
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    password: "password123",
  },
];
