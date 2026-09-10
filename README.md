# Getway de Pagamento

Plataforma financeira full stack, multiempresa e preparada para integração com BaaS/gateway. O projeto funciona sem credenciais externas usando um provedor Sandbox interno e possui adaptador para Asaas Sandbox/Produção.

## Entregue
- Dashboard financeiro, autenticação JWT e isolamento por tenant.
- Cadastro de clientes e cobranças Pix, boleto, cartão e método indefinido.
- QR Code/Pix copia-e-cola via adaptador do provedor.
- Estorno de cobranças, razão financeiro e conciliação por webhook idempotente.
- Assinaturas recorrentes, links de pagamento e transferências Pix via provider pattern.
- Backend Node.js + Express + TypeScript + Prisma/PostgreSQL.
- Frontend React + Vite responsivo com painel, clientes, cobranças, financeiro e configurações.
- Docker Compose para PostgreSQL e arquivo `.env.example`.
- Dockerfiles para API e frontend, `docker-compose.prod.yml` e CI no GitHub Actions.
- Rate limiting, Helmet, CORS, RBAC para operações críticas e proteção de webhook.
- Provider pattern: `sandbox` para desenvolvimento e `asaas` para operação integrada.

## Rodando localmente
1. `cp .env.example .env`
2. `docker compose up -d`
3. `npm install`
4. `npm run db:generate`
5. `npm run db:migrate`
6. `npm run db:seed`
7. `npm run dev`

Frontend: http://localhost:5173  
API: http://localhost:3333  
Healthcheck: http://localhost:3333/health

Usuário seed: `demo@getway.local` / `Getway@123` (troque em qualquer ambiente público).

## Integração Asaas
No `.env`:
```env
PAYMENT_PROVIDER=asaas
ASAAS_ENV=sandbox
ASAAS_API_KEY=$aact_...
ASAAS_WEBHOOK_TOKEN=um-token-forte
```
Cadastre no Asaas o webhook `POST https://SEU-DOMINIO/webhooks/asaas` usando o mesmo token de autenticação. O backend trata duplicidade de evento e sincroniza status de pagamentos.

## Segurança e produção
- Nunca envie credenciais para o frontend ou GitHub.
- Troque `JWT_SECRET`, senha seed e token de webhook antes do deploy.
- Use HTTPS, banco gerenciado com backup, observabilidade, rate limiting e rotação de segredos.
- Para operar como instituição financeira própria no Brasil, há requisitos regulatórios. Este projeto foi desenhado para usar um provedor/BaaS autorizado para a movimentação financeira.

## Evolução de produto
A arquitetura já suporta expansão para split, emissão fiscal, subcontas, KYC, antifraude, Pix Automático, API pública e conciliação avançada sem reconstruir o núcleo.
