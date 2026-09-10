import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const passwordHash = await bcrypt.hash('Getway@123', 12);
const tenant = await prisma.tenant.upsert({where:{id:'demo-tenant'},update:{},create:{id:'demo-tenant',name:'Empresa Demonstração'}});
await prisma.user.upsert({where:{email:'demo@getway.local'},update:{},create:{tenantId:tenant.id,name:'Administrador',email:'demo@getway.local',passwordHash,role:'OWNER'}});
console.log('Demo: demo@getway.local / Getway@123');
await prisma.$disconnect();
