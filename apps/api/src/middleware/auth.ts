import type { NextFunction, Request, Response } from 'express';
import { verifyToken, type AuthPayload } from '../lib/jwt.js';
declare global { namespace Express { interface Request { auth?: AuthPayload } } }
export function auth(req: Request,res: Response,next: NextFunction){
  const token=req.headers.authorization?.replace(/^Bearer\s+/i,'');
  if(!token) return res.status(401).json({error:'Não autenticado'});
  try { req.auth=verifyToken(token); next(); } catch { return res.status(401).json({error:'Token inválido ou expirado'}); }
}
export function requireRole(...roles:string[]){return(req:Request,res:Response,next:NextFunction)=>{if(!req.auth||!roles.includes(req.auth.role))return res.status(403).json({error:'Sem permissão para esta operação'});next();}}
