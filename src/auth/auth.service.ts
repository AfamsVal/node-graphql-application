import jwt from "jsonwebtoken";

class AuthService {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
  }

  async generateToken(userId: number): Promise<string> {
    const token = jwt.sign({ userId }, this.secretKey, { expiresIn: "1h" });
    return token;
  }

  async verifyToken(token: string): Promise<number | null> {
    try {
      const decodedToken: any = jwt.verify(token, this.secretKey);
      return decodedToken.userId;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default AuthService;
