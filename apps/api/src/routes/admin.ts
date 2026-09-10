import { Router } from 'express'; import { prisma } from '../lib/prisma.js';
const router=Router();
router.get('/summary',async(req,res)=>{const tenantId=req.auth!.tenantId;const [users,ledger,subscriptions]=await Promise.all([prisma.user.count({where:{tenantId}}),prisma.ledgerEntry.findMany({where:{tenantId},orderBy:{createdAt:'desc'},take:50}),prisma.subscription.count({where:{tenantId,status:'ACTIVE'}})]);res.json({users,subscriptions,ledger});});
export default router;
