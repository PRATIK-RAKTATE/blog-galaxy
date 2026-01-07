import bcrypt from "bcrypt";

export const hashValue = (value) => bcrypt.hash(value, 12);
export const compareHash = (value, hash) => bcrypt.compare(value, hash);
