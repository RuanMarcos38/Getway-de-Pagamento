import { Router } from 'express'; import { z } from 'zod'; import { prisma } from '../lib/prisma.js'; import { paymentProvider } from '../providers/index.js';
const router=Router();
router.get('/',async(req,res)=>res.json(await prisma.customer.findMany({where:{tenantId:req.auth!.tenantId},orderBy:{createdAt:'desc'}})));
router.post('/',async(req,res)=>{try{const d=z.object({name:z.string().min(2),email:z.string().email().optional(),phone:z.string().optional(),document:z.string().optional()}).parse(req.body); const remote=await paymentProvider.createCustomer(d); const c=await prisma.customer.create({data:{tenantId:req.auth!.tenantId,providerId:remote.id,...d}});res.status(201).json(c)}catch(e:any){res.status(400).json({error:e.message})}});
export default router;
