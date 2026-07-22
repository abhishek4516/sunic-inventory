import jwt from "jsonwebtoken";

export type UserRole = "admin" | "employee";

const generateToken = (
  id: string,
  role: UserRole
) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;