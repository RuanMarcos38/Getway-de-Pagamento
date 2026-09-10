import { Router } from 'express'; import crypto from 'node:crypto'; import { env } from '../config.js'; import { prisma } from '../lib/prisma.js';
const router=Router();
const mapStatus=(event:string)=>event==='PAYMENT_RECEIVED'?'RECEIVED':event==='PAYMENT_CONFIRMED'?'CONFIRMED':event==='PAYMENT_OVERDUE'?'OVERDUE':event==='PAYMENT_REFUNDED'?'REFUNDED':event==='PAYMENT_DELETED'?'CANCELLED':null;
router.post('/asaas',async(req,res)=>{const token=String(req.headers['asaas-access-token']||req.headers['x-webhook-token']||'');if(token!==env.ASAAS_WEBHOOK_TOKEN)return res.status(401).json({error:'Webhook não autorizado'});
 const event=String(req.body?.event||'UNKNOWN'); const providerPaymentId=req.body?.payment?.id as string|undefined; const eventId=String(req.body?.id||crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('hex'));
 try{await prisma.webhookEvent.create({data:{id:eventId,provider:'asaas',event,payload:req.body}})}catch{return res.status(200).json({ok:true,duplicate:true})}
 const status=mapStatus(event); if(status&&providerPaymentId){const p=await prisma.payment.findUnique({where:{providerId:providerPaymentId}});if(p){await prisma.payment.update({where:{id:p.id},data:{status,paidAt:['RECEIVED','CONFIRMED'].includes(status)?new Date():p.paidAt}}); if(['RECEIVED','CONFIRMED'].includes(status)){const exists=await prisma.ledgerEntry.findFirst({where:{paymentId:p.id,type:'CREDIT'}});if(!exists)await prisma.ledgerEntry.create({data:{tenantId:p.tenantId,paymentId:p.id,type:'CREDIT',amount:p.netAmount,description:`Recebimento ${p.id}`}})}}}
 res.json({ok:true});});
export default router;
