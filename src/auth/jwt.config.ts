import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecretkey";

const signToken = async (userId: string): Promise<string> => {
  try {
    const token = await jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (err) {
    throw err;
  }
};

const verifyToken = (token: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return resolve(null);
      }
      return resolve((decoded as any).userId);
    });
  });
};

export { signToken, verifyToken };
