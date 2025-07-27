import bcrypt from "bcryptjs";

export const hashValue = async (value: string, saltRounds: number = 10) => {
  return await bcrypt.hash(value, saltRounds);
};

export const compareValue = async (value: string, hash: string) => {
  return await bcrypt.compare(value, hash);
};
