import jwt from 'jsonwebtoken';
import { env } from '../config.js';
export type AuthPayload = { sub: string; tenantId: string; role: string };
export const signToken = (p: AuthPayload) => jwt.sign(p, env.JWT_SECRET, { expiresIn: '12h' });
export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as AuthPayload;
