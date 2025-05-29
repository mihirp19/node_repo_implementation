import { Request, Response } from "express";
import { RefreshTokenService } from "../services/refreshTokenService";
import { RefreshTokenRepository } from "../repository/refreshTokenRepository";

const refreshTokenRepository = new RefreshTokenRepository();
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);

export const createRefreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.status(404).json({ message: "Token not found" });
  }
  const refreshTokenRes = await refreshTokenService.refreshToken(token);
  if (!refreshTokenRes) {
    res.status(403).json({ message: "Invalid Token or expired refresh token" });
    return;
  }

  const { newAccessToken, newRefToken } = refreshTokenRes;
  res.status(200).json({ newAccessToken, newRefToken });
};
