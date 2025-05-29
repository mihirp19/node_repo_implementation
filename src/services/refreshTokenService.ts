import { RefreshTokenEntity } from "../entities/RefreshToken";
import { IRefreshTokenRepository } from "../repository/interfaces/IRefreshTokenRepository";
import { generateRefreshToken, generateToken } from "../utils/token";

export class RefreshTokenService {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}
  async createRefreshTokenService(
    data: RefreshTokenEntity
  ): Promise<RefreshTokenEntity> {
    return this.refreshTokenRepository.create(data);
  }
  async updateRefreshTokenService(
    id: string,
    data: Partial<RefreshTokenEntity>
  ): Promise<RefreshTokenEntity | null> {
    return this.refreshTokenRepository.update(id, data);
  }
  async deleteRefreshTokenService(
    id: string
  ): Promise<RefreshTokenEntity | null> {
    return this.refreshTokenRepository.delete(id);
  }

  async refreshToken(
    token: string
  ): Promise<{
    user: any;
    newAccessToken: string;
    newRefToken: string;
  } | null> {
    const refToken = await this.refreshTokenRepository.findByToken(token);

    if (!refToken || !refToken.user || !refToken.id) {
      return null;
    }

    const user = refToken.user;
    await this.refreshTokenRepository.delete(refToken.id);

    const newRefToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const newAccessToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    await this.refreshTokenRepository.create({
      token: newRefToken,
      userId: user.id,
    });

    return {
      user,
      newAccessToken,
      newRefToken,
    };
  }
}
