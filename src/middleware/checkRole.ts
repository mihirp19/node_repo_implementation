import { Request, Response, NextFunction } from "express";

export function checkRole(allowedRole: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !allowedRole.includes(user.role)) {
      res.status(403).json({ error: "Forbidden: Access denied" });
      return;
    }
    next();
  };
}
