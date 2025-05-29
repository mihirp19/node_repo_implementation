import { RefreshTokenModel } from "../models/RefreshTokenModel";
import { RefreshTokenEntity } from "../entities/RefreshToken";
import { IRefreshTokenRepository } from "./interfaces/IRefreshTokenRepository";
import { UserModel } from "../models/UserModel";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(refreshToken: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    const created = await RefreshTokenModel.create(refreshToken);
    return created.toJSON() as RefreshTokenEntity;
  }

  async delete(id: string): Promise<RefreshTokenEntity | null> {
    const deleteToken = await RefreshTokenModel.findByPk(id);
    if (!deleteToken) return null;
    await deleteToken.destroy();
    return deleteToken.toJSON();
  }
  async update(
    id: string,
    data: Partial<RefreshTokenEntity>
  ): Promise<RefreshTokenEntity | null> {
    const updateToken = await RefreshTokenModel.findOne({ where: { id } });
    if (!updateToken) return null;
    await updateToken.update(data);
    return updateToken.toJSON();
  }
  async findByUserId(userId: string): Promise<RefreshTokenEntity | null> {
    const token = await RefreshTokenModel.findOne({ where: { userId } });
    if (!token) return null;
    return token.toJSON() as RefreshTokenEntity;
  }
  async findByToken(
    token: string
  ): Promise<(RefreshTokenEntity & { user?: any }) | null> {
    const refToken = await RefreshTokenModel.findOne({
      where: { token },
      include: [{ model: UserModel }],
    });
    if (!refToken) return null;

    const json = refToken.toJSON() as RefreshTokenEntity & { user?: any };
    json.user = (refToken as any).UserModel ?? null;
    return json;
  }
}
