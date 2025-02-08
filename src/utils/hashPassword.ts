import bycrypt from "bcrypt";

const hashPassword = async (plainPass: string) => {
  const hashedPassword = await bycrypt.hash(plainPass, 10);
  return hashedPassword;
};

const verifyPassword = async (plainPass: string, hashedPass: string) => {
  const isValid = await bycrypt.compare(plainPass, hashedPass);
  return isValid;
};

export { hashPassword, verifyPassword };
