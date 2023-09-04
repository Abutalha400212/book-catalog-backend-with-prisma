import bcrypt from "bcrypt";
import config from "../config";

async function hashPassword(password: string) {
  const saltRounds = Number(config.bcrypt_salt_rounds);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export default hashPassword;
