import { Router } from 'express'; import { prisma } from '../lib/prisma.js';
const router=Router();
router.get('/',async(req,res)=>{const tenantId=req.auth!.tenantId;const [received,pending,overdue,count,customers]=await Promise.all([
 prisma.payment.aggregate({where:{tenantId,status:{in:['CONFIRMED','RECEIVED']}},_sum:{netAmount:true}}),
 prisma.payment.aggregate({where:{tenantId,status:'PENDING'},_sum:{amount:true}}),
 prisma.payment.aggregate({where:{tenantId,status:'OVERDUE'},_sum:{amount:true}}),
 prisma.payment.count({where:{tenantId}}),prisma.customer.count({where:{tenantId}})]);
res.json({balance:Number(received._sum.netAmount||0),pending:Number(pending._sum.amount||0),overdue:Number(overdue._sum.amount||0),payments:count,customers});});
export default router;
