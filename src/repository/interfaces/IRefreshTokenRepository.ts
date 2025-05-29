import { RefreshTokenEntity } from "../../entities/RefreshToken";

export interface IRefreshTokenRepository {
  create(refreshToken: RefreshTokenEntity): Promise<RefreshTokenEntity>;
  findByToken(
    token: string
  ): Promise<(RefreshTokenEntity & { user?: any }) | null>;
  findByUserId(userId: string): Promise<RefreshTokenEntity | null>;
  update(
    id: string,
    data: Partial<RefreshTokenEntity>
  ): Promise<RefreshTokenEntity | null>;
  delete(id: string): Promise<RefreshTokenEntity | null>;
}
