import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";
const JWT_REFRESH = process.env.JWT_REFRESH || "refreshSecretKey";

// Generate Access Token
export function generateToken(payload: {
  id: string;
  email: string;
  role: string;
}): string {
  if (!payload.id || !payload.email || !payload.role) {
    throw new Error("Missing required fields");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "10m" });
}

// Generate Refresh Token
export function generateRefreshToken(payload: {
  id: string;
  email: string;
  role: string;
}): string {
  if (!payload.id || !payload.email || !payload.role) {
    throw new Error("Missing required fields");
  }
  return jwt.sign(payload, JWT_REFRESH, { expiresIn: "1d" });
}

// Verify Access Token
export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

// Verify Refresh Token
export function verifyRefreshToken(refreshToken: string): any {
  return jwt.verify(refreshToken, JWT_REFRESH);
}
