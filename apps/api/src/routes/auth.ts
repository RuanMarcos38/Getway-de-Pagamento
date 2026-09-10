import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';
const router=Router();
router.post('/register',async(req,res)=>{try{
 const d=z.object({company:z.string().min(2),name:z.string().min(2),email:z.string().email(),password:z.string().min(8)}).parse(req.body);
 if(await prisma.user.findUnique({where:{email:d.email}})) return res.status(409).json({error:'E-mail já cadastrado'});
 const passwordHash=await bcrypt.hash(d.password,12);
 const tenant=await prisma.tenant.create({data:{name:d.company,users:{create:{name:d.name,email:d.email,passwordHash,role:'OWNER'}}},include:{users:true}});
 const user=tenant.users[0]; const token=signToken({sub:user.id,tenantId:tenant.id,role:user.role});
 res.status(201).json({token,user:{id:user.id,name:user.name,email:user.email,role:user.role},tenant:{id:tenant.id,name:tenant.name}});
}catch(e:any){res.status(400).json({error:e.message})}});
router.post('/login',async(req,res)=>{try{
 const d=z.object({email:z.string().email(),password:z.string()}).parse(req.body); const user=await prisma.user.findUnique({where:{email:d.email},include:{tenant:true}});
 if(!user||!(await bcrypt.compare(d.password,user.passwordHash))) return res.status(401).json({error:'Credenciais inválidas'});
 res.json({token:signToken({sub:user.id,tenantId:user.tenantId,role:user.role}),user:{id:user.id,name:user.name,email:user.email,role:user.role},tenant:{id:user.tenant.id,name:user.tenant.name}});
}catch(e:any){res.status(400).json({error:e.message})}});
export default router;
