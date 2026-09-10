import { useMemo, useState } from 'react';
import {
    ArrowLeftRight,
    BadgeDollarSign,
    Bell,
    Calculator,
    CalendarDays,
    ChevronDown,
    ChevronRight,
    CircleDollarSign,
    Copy,
    CreditCard,
    Download,
    FileCheck2,
    FileText,
    Filter,
    HandCoins,
    HelpCircle,
    Landmark,
    LayoutDashboard,
    Link2,
    Menu,
    MessageSquareText,
    MoreVertical,
    Plus,
    QrCode,
    ReceiptText,
    RefreshCw,
    Search,
    Settings,
    ShieldAlert,
    Smartphone,
    UploadCloud,
    UserRound,
    Users,
    WalletCards,
    X,
} from 'lucide-react';

type Page =
    | 'summary'
    | 'charges-all'
    | 'charges-single'
    | 'charges-installments'
    | 'charges-subscriptions'
    | 'charges-simulator'
    | 'payment-links'
    | 'customers'
    | 'groups'
    | 'pix-transactions'
    | 'pix-transfers'
    | 'statement'
    | 'bill-payments'
    | 'card'
    | 'anticipations-all'
    | 'anticipations-simulator'
    | 'negotiation'
    | 'invoices-all'
    | 'invoices-settings'
    | 'settings';

type MenuGroup = {
    id: string;
    label: string;
    icon: typeof LayoutDashboard;
    page?: Page;
    children?: Array<{ page: Page; label: string }>;
};

const menu: MenuGroup[] = [
    { id: 'summary', label: 'Resumo', icon: LayoutDashboard, page: 'summary' },
    {
        id: 'charges',
        label: 'Cobranças',
        icon: ReceiptText,
        children: [
            { page: 'charges-all', label: 'Todas' },
            { page: 'charges-single', label: 'Avulsas' },
            { page: 'charges-installments', label: 'Parcelamentos' },
            { page: 'charges-subscriptions', label: 'Assinaturas' },
            { page: 'charges-simulator', label: 'Simulador de vendas' },
        ],
    },
    { id: 'links', label: 'Links de Pagamento', icon: Link2, page: 'payment-links' },
    {
        id: 'customers',
        label: 'Meus clientes',
        icon: Users,
        children: [
            { page: 'customers', label: 'Clientes' },
            { page: 'groups', label: 'Grupos' },
        ],
    },
    {
        id: 'pix',
        label: 'Pix',
        icon: QrCode,
        children: [
            { page: 'pix-transactions', label: 'Transações' },
            { page: 'pix-transfers', label: 'Transferências' },
        ],
    },
    {
        id: 'money',
        label: 'Meu Dinheiro',
        icon: WalletCards,
        children: [
            { page: 'statement', label: 'Extrato' },
            { page: 'bill-payments', label: 'Pague Contas' },
            { page: 'card', label: 'Cartão' },
        ],
    },
    {
        id: 'anticipations',
        label: 'Antecipações',
        icon: HandCoins,
        children: [
            { page: 'anticipations-all', label: 'Todas' },
            { page: 'anticipations-simulator', label: 'Simular antecipação' },
        ],
    },
    { id: 'negotiation', label: 'Negativação', icon: ShieldAlert, page: 'negotiation' },
    {
        id: 'invoices',
        label: 'Notas Fiscais',
        icon: FileText,
        children: [
            { page: 'invoices-all', label: 'Todas' },
            { page: 'invoices-settings', label: 'Configurações' },
        ],
    },
    { id: 'settings', label: 'Configurações', icon: Settings, page: 'settings' },
];

const charges = [
    { id: 'cob_83014', customer: 'Marina Souza', description: 'Plano Business', type: 'Avulsa', method: 'Pix', value: 'R$ 1.290,00', due: '10/09/2026', status: 'Recebida' },
    { id: 'cob_83013', customer: 'Almeida Engenharia', description: 'Mensalidade setembro', type: 'Assinatura', method: 'Boleto/Pix', value: 'R$ 890,00', due: '12/09/2026', status: 'Aguardando' },
    { id: 'cob_83012', customer: 'Prime Decor', description: 'Projeto comercial', type: 'Parcelamento', method: 'Cartão', value: 'R$ 2.490,00', due: '09/09/2026', status: 'Confirmada' },
    { id: 'cob_83011', customer: 'Rota Sul Logística', description: 'Licença mensal', type: 'Assinatura', method: 'Pix', value: 'R$ 599,00', due: '05/09/2026', status: 'Vencida' },
    { id: 'cob_83010', customer: 'Nova Era Têxtil', description: 'Implantação', type: 'Avulsa', method: 'Boleto', value: 'R$ 3.800,00', due: '18/09/2026', status: 'Aguardando' },
];

const customers = [
    { name: 'Marina Souza', document: '***.416.829-**', email: 'marina@empresa.com.br', phone: '(47) 9 8765-1020', open: 'R$ 0,00', status: 'Em dia' },
    { name: 'Almeida Engenharia', document: '12.***.***/0001-**', email: 'financeiro@almeida.com.br', phone: '(47) 3456-2290', open: 'R$ 890,00', status: 'Em dia' },
    { name: 'Prime Decor', document: '45.***.***/0001-**', email: 'contato@primedecor.com.br', phone: '(47) 9 9221-7100', open: 'R$ 0,00', status: 'Em dia' },
    { name: 'Rota Sul Logística', document: '18.***.***/0001-**', email: 'adm@rotasul.com.br', phone: '(47) 3025-0900', open: 'R$ 599,00', status: 'Inadimplente' },
];

const transactions = [
    { date: '10/09/2026 13:42', title: 'Recebimento Pix · Marina Souza', type: 'Crédito', value: '+ R$ 1.290,00', status: 'Concluído' },
    { date: '10/09/2026 11:16', title: 'Transferência Pix · Fornecedor Demo', type: 'Débito', value: '- R$ 780,00', status: 'Concluído' },
    { date: '09/09/2026 17:04', title: 'Recebimento cartão · Prime Decor', type: 'Crédito', value: '+ R$ 2.490,00', status: 'Confirmado' },
    { date: '09/09/2026 09:11', title: 'Tarifa demonstrativa', type: 'Débito', value: '- R$ 4,90', status: 'Concluído' },
];

export default function App() {
    const [page, setPage] = useState<Page>('summary');
    const [openGroups, setOpenGroups] = useState<string[]>(['charges']);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toast, setToast] = useState('');
    const [chargeWizard, setChargeWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    const pageTitle = getPageTitle(page);
    const filteredCharges = useMemo(() => charges.filter((charge) => {
        const matchesSearch = `${charge.customer} ${charge.description} ${charge.id}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || charge.status === statusFilter;
        return matchesSearch && matchesStatus;
    }), [search, statusFilter]);

    const notify = (message: string) => {
        setToast(message);
        window.setTimeout(() => setToast(''), 1800);
    };
    const navigate = (nextPage: Page) => { setPage(nextPage); setMobileOpen(false); };
    const toggleGroup = (id: string) => setOpenGroups((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    const startCharge = () => { setWizardStep(1); setChargeWizard(true); };

    return (
        <div className="app-shell">
            {toast && <div className="toast">{toast}</div>}
            <aside className={mobileOpen ? 'sidebar mobile-open' : 'sidebar'}>
                <div className="brand-row"><div className="brand-mark">G</div><div className="brand-copy"><strong>Getway</strong><span>FINANCE</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X size={20} /></button></div>
                <div className="account-switcher"><div className="account-avatar">RM</div><div><strong>Empresa Demonstração</strong><span>Conta principal</span></div><ChevronDown size={15} /></div>
                <nav className="sidebar-nav">
                    {menu.map((group) => {
                        const Icon = group.icon;
                        const isOpen = openGroups.includes(group.id);
                        const isActive = group.page === page || group.children?.some((child) => child.page === page);
                        return <div className="menu-group" key={group.id}><button className={`menu-item ${isActive ? 'active' : ''}`} onClick={() => group.children ? toggleGroup(group.id) : group.page && navigate(group.page)}><Icon size={18} /><span>{group.label}</span>{group.children && <ChevronDown className={isOpen ? 'chevron open' : 'chevron'} size={15} />}</button>{group.children && isOpen && <div className="submenu">{group.children.map((child) => <button key={child.page} className={page === child.page ? 'active' : ''} onClick={() => navigate(child.page)}>{child.label}</button>)}</div>}</div>;
                    })}
                </nav>
                <div className="demo-pill"><span /> AMBIENTE DE DEMONSTRAÇÃO</div>
            </aside>

            <div className="workspace">
                <header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu size={20} /></button><div className="breadcrumb"><span>Getway Finance</span><ChevronRight size={14} /><strong>{pageTitle}</strong></div></div><div className="topbar-actions"><button className="ghost-icon" title="Ajuda"><HelpCircle size={18} /></button><button className="ghost-icon notify-dot" title="Notificações"><Bell size={18} /></button><button className="create-button" onClick={startCharge}><Plus size={17} /> Criar cobrança <ChevronDown size={14} /></button><button className="profile-button"><span>RM</span><ChevronDown size={14} /></button></div></header>
                <main className="content">
                    <div className="demo-banner"><div><strong>Protótipo funcional</strong><span>Todos os valores, cobranças e transações abaixo são simulados.</span></div><span className="demo-status">Sem movimentação financeira real</span></div>
                    <div className="page-head"><div><h1>{pageTitle}</h1><p>{getPageSubtitle(page)}</p></div>{page !== 'summary' && page !== 'settings' && <div className="head-actions"><button className="secondary-button" onClick={() => notify('Filtros demonstrativos atualizados')}><Filter size={16} /> Filtros</button>{canCreate(page) && <button className="primary-button" onClick={startCharge}><Plus size={16} /> {getActionLabel(page)}</button>}</div>}</div>
                    {page === 'summary' && <SummaryPage notify={notify} />}
                    {page.startsWith('charges-') && page !== 'charges-simulator' && <ChargesPage page={page} rows={filteredCharges} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} notify={notify} />}
                    {page === 'charges-simulator' && <SalesSimulator notify={notify} />}
                    {page === 'payment-links' && <PaymentLinksPage notify={notify} />}
                    {page === 'customers' && <CustomersPage notify={notify} />}
                    {page === 'groups' && <GroupsPage notify={notify} />}
                    {page === 'pix-transactions' && <PixTransactions notify={notify} />}
                    {page === 'pix-transfers' && <PixTransfers notify={notify} />}
                    {page === 'statement' && <StatementPage notify={notify} />}
                    {page === 'bill-payments' && <BillPaymentsPage notify={notify} />}
                    {page === 'card' && <CardPage notify={notify} />}
                    {page === 'anticipations-all' && <AnticipationsPage notify={notify} />}
                    {page === 'anticipations-simulator' && <AnticipationSimulator notify={notify} />}
                    {page === 'negotiation' && <NegotiationPage notify={notify} />}
                    {page === 'invoices-all' && <InvoicesPage notify={notify} />}
                    {page === 'invoices-settings' && <InvoiceSettings notify={notify} />}
                    {page === 'settings' && <SettingsPage notify={notify} />}
                </main>
            </div>
            {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}
            {chargeWizard && <ChargeWizard step={wizardStep} setStep={setWizardStep} onClose={() => setChargeWizard(false)} onFinish={() => { setChargeWizard(false); notify('Cobrança simulada criada com sucesso'); }} />}
        </div>
    );
}

function SummaryPage({ notify }: { notify: (message: string) => void }) {
    return <><div className="summary-toolbar"><button className="period-button"><CalendarDays size={16} /> 01/09/2026 — 30/09/2026 <ChevronDown size={14} /></button><button className="secondary-button" onClick={() => notify('Resumo atualizado')}><RefreshCw size={15} /> Atualizar</button></div><section className="summary-section"><div className="section-title"><div><span className="eyebrow">CLIENTES</span><h2>Situação da carteira</h2></div></div><div className="metric-grid two"><MetricCard label="Em dia" value="146" helper="96% da carteira" tone="success" /><MetricCard label="Inadimplentes" value="6" helper="4% da carteira" tone="danger" /></div></section><section className="summary-section"><div className="section-title"><div><span className="eyebrow">COBRANÇAS</span><h2>Movimentação do período</h2></div><button className="link-button">Ver todas <ChevronRight size={14} /></button></div><div className="metric-grid three"><MetricCard label="Previstas" value="42" helper="R$ 26.480,00" /><MetricCard label="Vencidas" value="4" helper="R$ 2.850,00" tone="danger" /><MetricCard label="Recebidas" value="118" helper="R$ 48.590,70" tone="success" /></div></section><section className="summary-section"><div className="section-title"><div><span className="eyebrow">FATURAMENTO</span><h2>Resultado financeiro</h2></div></div><div className="metric-grid three"><MetricCard label="Previsto" value="R$ 26.480,00" helper="A receber" /><MetricCard label="Confirmado" value="R$ 8.420,00" helper="Em compensação" tone="warning" /><MetricCard label="Recebido" value="R$ 48.590,70" helper="Disponível" tone="success" /></div></section><section className="panel chart-panel"><div className="panel-head"><div><h2>Faturamento</h2><p>Previsto x confirmado e recebido</p></div><div className="legend"><span><i className="legend-dot expected" /> Previsto</span><span><i className="legend-dot received" /> Confirmado + recebido</span></div></div><div className="chart-area"><div className="chart-y"><span>60k</span><span>45k</span><span>30k</span><span>15k</span><span>0</span></div><div className="chart-plot"><svg viewBox="0 0 900 220" preserveAspectRatio="none" aria-label="Gráfico de faturamento demonstrativo"><polyline className="line-expected" points="0,178 110,162 220,145 330,133 440,108 550,103 660,82 770,62 900,54" /><polyline className="line-received" points="0,194 110,181 220,171 330,144 440,137 550,111 660,105 770,83 900,69" /></svg><div className="chart-x"><span>01/09</span><span>08/09</span><span>15/09</span><span>22/09</span><span>30/09</span></div></div></div></section></>;
}

function MetricCard({ label, value, helper, tone = 'default' }: { label: string; value: string; helper: string; tone?: 'default' | 'success' | 'danger' | 'warning' }) {
    return <div className={`metric-card ${tone}`}><div className="metric-icon"><CircleDollarSign size={18} /></div><div><span>{label}</span><strong>{value}</strong><small>{helper}</small></div><ChevronRight size={18} className="metric-arrow" /></div>;
}

function ChargesPage({ page, rows, search, setSearch, statusFilter, setStatusFilter, notify }: { page: Page; rows: typeof charges; search: string; setSearch: (value: string) => void; statusFilter: string; setStatusFilter: (value: string) => void; notify: (message: string) => void }) {
    const type = page === 'charges-single' ? 'Avulsa' : page === 'charges-installments' ? 'Parcelamento' : page === 'charges-subscriptions' ? 'Assinatura' : null;
    const visible = type ? rows.filter((row) => row.type === type) : rows;
    return <section className="panel"><div className="list-toolbar"><div className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente, descrição ou ID" /></div><div className="filter-pills">{['Todos', 'Aguardando', 'Confirmada', 'Recebida', 'Vencida'].map((status) => <button key={status} className={statusFilter === status ? 'active' : ''} onClick={() => setStatusFilter(status)}>{status}</button>)}</div></div><div className="table-wrap"><table><thead><tr><th>Cliente</th><th>Descrição</th><th>Tipo</th><th>Forma de pagamento</th><th>Valor</th><th>Vencimento</th><th>Situação</th><th /></tr></thead><tbody>{visible.map((row) => <tr key={row.id} onClick={() => notify(`Detalhes de ${row.id} abertos no modo demonstração`)}><td><strong>{row.customer}</strong><small>{row.id}</small></td><td>{row.description}</td><td>{row.type}</td><td>{row.method}</td><td><strong>{row.value}</strong></td><td>{row.due}</td><td><Status value={row.status} /></td><td><button className="table-action" onClick={(event) => { event.stopPropagation(); notify('Menu de ações aberto'); }}><MoreVertical size={17} /></button></td></tr>)}{visible.length === 0 && <tr><td className="empty-row" colSpan={8}>Nenhuma cobrança encontrada com os filtros selecionados.</td></tr>}</tbody></table></div></section>;
}

function SalesSimulator({ notify }: { notify: (message: string) => void }) {
    const [value, setValue] = useState('5000');
    const [installments, setInstallments] = useState('6');
    const gross = Number(value || 0); const fee = gross * 0.0349; const net = gross - fee;
    return <div className="split-layout"><section className="panel form-panel"><span className="eyebrow">SIMULAÇÃO</span><h2>Simulador de vendas no cartão</h2><p>Calcule taxas e valor líquido com dados demonstrativos.</p><label>Valor total<input value={value} onChange={(event) => setValue(event.target.value)} inputMode="decimal" /></label><label>Número de parcelas<select value={installments} onChange={(event) => setInstallments(event.target.value)}>{[1,2,3,4,5,6,10,12].map((item) => <option key={item} value={item}>{item}x</option>)}</select></label><button className="primary-button wide" onClick={() => notify('Simulação recalculada')}>Simular venda</button></section><section className="panel result-panel"><span className="eyebrow">RESULTADO DA SIMULAÇÃO</span><div className="result-line"><span>Valor da venda</span><strong>{currency(gross)}</strong></div><div className="result-line"><span>Taxa demonstrativa</span><strong>- {currency(fee)}</strong></div><div className="result-line total"><span>Valor líquido estimado</span><strong>{currency(net)}</strong></div><div className="result-line"><span>Parcelamento</span><strong>{installments}x de {currency(gross / Number(installments))}</strong></div><div className="info-box">Simulação visual. Nenhuma tarifa real está sendo calculada.</div></section></div>;
}

function PaymentLinksPage({ notify }: { notify: (message: string) => void }) { return <DataTable headers={['Nome do link', 'Tipo', 'Valor', 'Formas de pagamento', 'Utilizações', 'Situação']} rows={[[ 'Consultoria Comercial', 'Avulsa', 'R$ 1.500,00', 'Pix / Cartão', '18 vendas', 'Ativo'], ['Plano Pro', 'Recorrente', 'R$ 599,00', 'Todos', '31 vendas', 'Ativo'], ['Diagnóstico Financeiro', 'Avulsa', 'Valor aberto', 'Pix', '7 vendas', 'Desabilitado']]} statusIndex={5} action={() => notify('Ações do link abertas')} />; }

function CustomersPage({ notify }: { notify: (message: string) => void }) { return <section className="panel"><div className="list-toolbar"><div className="search-box"><Search size={16} /><input placeholder="Buscar por nome, CPF/CNPJ, e-mail ou telefone" /></div><button className="secondary-button"><Filter size={15} /> Filtros avançados</button></div><div className="table-wrap"><table><thead><tr><th>Cliente</th><th>CPF/CNPJ</th><th>Contato</th><th>Em aberto</th><th>Situação</th><th /></tr></thead><tbody>{customers.map((customer) => <tr key={customer.name} onClick={() => notify(`Cadastro de ${customer.name} aberto`)}><td><strong>{customer.name}</strong><small>{customer.email}</small></td><td>{customer.document}</td><td>{customer.phone}</td><td>{customer.open}</td><td><Status value={customer.status} /></td><td><button className="table-action"><MoreVertical size={17} /></button></td></tr>)}</tbody></table></div></section>; }
function GroupsPage({ notify }: { notify: (message: string) => void }) { return <DataTable headers={['Grupo', 'Clientes', 'Valor em cobranças', 'Situação']} rows={[['Clientes Premium', '38 clientes', 'R$ 21.450,00', 'Ativo'], ['Mensalidades', '74 clientes', 'R$ 44.326,00', 'Ativo'], ['Cobrança preventiva', '12 clientes', 'R$ 6.980,00', 'Ativo']]} statusIndex={3} action={() => notify('Detalhes do grupo abertos')} />; }

function PixTransactions({ notify }: { notify: (message: string) => void }) { return <><div className="action-grid"><QuickAction icon={ArrowLeftRight} title="Enviar Pix" text="Simular transferência para uma chave Pix" onClick={() => notify('Fluxo Enviar Pix aberto em demonstração')} /><QuickAction icon={Copy} title="Pix Copia e Cola" text="Cole um código Pix para visualizar os dados" onClick={() => notify('Leitor Pix demonstrativo aberto')} /><QuickAction icon={QrCode} title="Receber com Pix" text="Gerar QR Code apenas visual" onClick={() => notify('QR Code demonstrativo criado')} /></div><section className="panel"><div className="panel-head"><div><h2>Últimas transações Pix</h2><p>Entradas e saídas demonstrativas.</p></div></div><div className="table-wrap"><table><thead><tr><th>Data</th><th>Descrição</th><th>Tipo</th><th>Valor</th><th>Situação</th></tr></thead><tbody>{transactions.slice(0,3).map((item) => <tr key={item.date + item.title}><td>{item.date}</td><td><strong>{item.title}</strong></td><td>{item.type}</td><td className={item.value.startsWith('+') ? 'positive' : 'negative'}>{item.value}</td><td><Status value={item.status} /></td></tr>)}</tbody></table></div></section></>; }
function PixTransfers({ notify }: { notify: (message: string) => void }) { return <DataTable headers={['Destinatário', 'Tipo de chave', 'Chave', 'Valor', 'Data', 'Situação']} rows={[['Fornecedor Demo', 'E-mail', 'demo@pix.com.br', 'R$ 780,00', '10/09/2026', 'Concluído'], ['Prestador Exemplo', 'CPF', '***.741.***-**', 'R$ 2.000,00', '09/09/2026', 'Concluído'], ['Agendamento Demo', 'Telefone', '+55 47 *****-4421', 'R$ 950,00', '15/09/2026', 'Agendado']]} statusIndex={5} action={() => notify('Comprovante demonstrativo aberto')} />; }
function StatementPage({ notify }: { notify: (message: string) => void }) { return <><div className="balance-card"><div><span>Saldo disponível</span><strong>R$ 57.245,80</strong><small>Saldo demonstrativo</small></div><button className="secondary-light" onClick={() => notify('Saldo ocultado apenas visualmente')}>Ocultar saldo</button></div><section className="panel"><div className="list-toolbar"><div className="filter-pills"><button className="active">Hoje</button><button>Últimos 7 dias</button><button>Últimos 15 dias</button><button>Personalizado</button></div><button className="secondary-button" onClick={() => notify('Exportação simulada: PDF, XLSX, CSV, OFX ou CNAB')}><Download size={15} /> Exportar extrato</button></div><div className="table-wrap"><table><thead><tr><th>Data</th><th>Movimentação</th><th>Tipo</th><th>Valor</th><th>Situação</th></tr></thead><tbody>{transactions.map((item) => <tr key={item.date + item.title}><td>{item.date}</td><td><strong>{item.title}</strong></td><td>{item.type}</td><td className={item.value.startsWith('+') ? 'positive' : 'negative'}>{item.value}</td><td><Status value={item.status} /></td></tr>)}</tbody></table></div></section></>; }
function BillPaymentsPage({ notify }: { notify: (message: string) => void }) { return <div className="split-layout"><section className="panel upload-panel"><UploadCloud size={38} /><h2>Anexe seu boleto</h2><p>Arraste um arquivo para cá ou clique para selecionar.</p><button className="secondary-button" onClick={() => notify('Upload desativado no modo demonstração')}>Selecionar arquivo</button></section><section className="panel form-panel"><span className="eyebrow">OU</span><h2>Digite o código de barras</h2><p>Use uma linha digitável fictícia para visualizar o fluxo.</p><label>Código de barras<input placeholder="00000.00000 00000.000000 00000.000000 0 00000000000000" /></label><button className="primary-button wide" onClick={() => notify('Boleto demonstrativo identificado')}>Continuar</button></section></div>; }
function CardPage({ notify }: { notify: (message: string) => void }) { return <div className="split-layout card-layout"><div className="demo-card"><div className="card-top"><span>GETWAY</span><span>DEMO</span></div><div className="chip" /><strong>•••• •••• •••• 8472</strong><div className="card-bottom"><span>EMPRESA DEMONSTRAÇÃO</span><span>09/31</span></div></div><section className="panel form-panel"><span className="eyebrow">CARTÃO DA CONTA</span><h2>Cartão demonstrativo</h2><p>Controle visual de um cartão empresarial sem emissão real.</p><button className="secondary-button wide" onClick={() => notify('Cartão demonstrativo bloqueado')}>Bloquear cartão</button><button className="secondary-button wide" onClick={() => notify('Limites demonstrativos abertos')}>Consultar limites</button><button className="secondary-button wide" onClick={() => notify('Fatura demonstrativa aberta')}>Ver movimentações</button></section></div>; }
function AnticipationsPage({ notify }: { notify: (message: string) => void }) { return <DataTable headers={['Solicitação', 'Origem', 'Valor bruto', 'Valor líquido', 'Data', 'Situação']} rows={[['ANT-2041', 'Cartão', 'R$ 4.800,00', 'R$ 4.612,32', '10/09/2026', 'Em análise'], ['ANT-2038', 'Boleto', 'R$ 8.300,00', 'R$ 7.982,40', '03/09/2026', 'Concluído']]} statusIndex={5} action={() => notify('Detalhes da antecipação abertos')} />; }
function AnticipationSimulator({ notify }: { notify: (message: string) => void }) { return <div className="split-layout"><section className="panel form-panel"><span className="eyebrow">SIMULADOR</span><h2>Antecipação de recebíveis</h2><p>Visualize uma proposta fictícia.</p><label>Forma de pagamento<select><option>Cartão de crédito</option><option>Boleto</option><option>Pix</option></select></label><label>Valor a antecipar<input defaultValue="10000" /></label><button className="primary-button wide" onClick={() => notify('Proposta demonstrativa simulada')}>Simular proposta</button></section><section className="panel result-panel"><span className="eyebrow">INFORMAÇÕES</span><div className="result-line"><span>Disponível para antecipar</span><strong>R$ 23.880,00</strong></div><div className="result-line"><span>Valor solicitado</span><strong>R$ 10.000,00</strong></div><div className="result-line"><span>Taxa demonstrativa</span><strong>R$ 382,00</strong></div><div className="result-line total"><span>Valor líquido estimado</span><strong>R$ 9.618,00</strong></div></section></div>; }
function NegotiationPage({ notify }: { notify: (message: string) => void }) { return <><div className="info-banner"><ShieldAlert size={20} /><div><strong>Fluxo demonstrativo de negativação</strong><span>Nenhum dado é enviado a bureaus de crédito.</span></div></div><DataTable headers={['ID', 'Cliente', 'Valor', 'Vencimento', 'Situação']} rows={[['NEG-193', 'Rota Sul Logística', 'R$ 599,00', '05/09/2026', 'Elegível'], ['NEG-184', 'Cliente Exemplo Ltda.', 'R$ 1.280,00', '22/08/2026', 'Em processamento']]} statusIndex={4} action={() => notify('Fluxo de negativação aberto em modo demonstração')} /></>; }
function InvoicesPage({ notify }: { notify: (message: string) => void }) { return <DataTable headers={['Nota', 'Cliente', 'Serviço', 'Valor', 'Data', 'Situação']} rows={[['NFS-8294', 'Marina Souza', 'Serviços de consultoria', 'R$ 1.290,00', '10/09/2026', 'Emitida'], ['NFS-8292', 'Prime Decor', 'Serviços digitais', 'R$ 2.490,00', '09/09/2026', 'Agendada'], ['NFS-8288', 'Almeida Engenharia', 'Licença de software', 'R$ 890,00', '12/09/2026', 'Pendente']]} statusIndex={5} action={() => notify('Nota fiscal demonstrativa aberta')} />; }
function InvoiceSettings({ notify }: { notify: (message: string) => void }) { return <div className="settings-grid"><SettingsBlock icon={Landmark} title="Informações fiscais" text="Configure regime tributário, município, série e dados da empresa." onClick={() => notify('Informações fiscais abertas')} /><SettingsBlock icon={FileCheck2} title="Serviços" text="Cadastre os serviços e códigos utilizados na emissão." onClick={() => notify('Cadastro de serviços aberto')} /><SettingsBlock icon={CalendarDays} title="Automação" text="Defina quando notas vinculadas a cobranças seriam geradas." onClick={() => notify('Automação fiscal aberta')} /></div>; }
function SettingsPage({ notify }: { notify: (message: string) => void }) { return <div className="settings-grid"><SettingsBlock icon={UserRound} title="Minha conta" text="Dados cadastrais, usuários, permissões e segurança." onClick={() => notify('Minha conta aberta')} /><SettingsBlock icon={MessageSquareText} title="Notificações" text="Regras demonstrativas para e-mail, SMS e WhatsApp." onClick={() => notify('Configurações de notificações abertas')} /><SettingsBlock icon={BadgeDollarSign} title="Taxas e limites" text="Tabela visual de tarifas, limites e regras da conta." onClick={() => notify('Taxas e limites abertos')} /><SettingsBlock icon={Settings} title="Personalização" text="Logo, cores, juros, descontos e preferências de cobrança." onClick={() => notify('Personalização aberta')} /></div>; }

function DataTable({ headers, rows, statusIndex = -1, action }: { headers: string[]; rows: string[][]; statusIndex?: number; action: () => void }) { return <section className="panel"><div className="list-toolbar"><div className="search-box"><Search size={16} /><input placeholder="Buscar" /></div><button className="secondary-button"><Filter size={15} /> Filtros</button></div><div className="table-wrap"><table><thead><tr>{headers.map((header, index) => <th key={`${header}-${index}`}>{header}</th>)}<th /></tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cellIndex === statusIndex ? <Status value={cell} /> : cellIndex === 0 ? <strong>{cell}</strong> : cell}</td>)}<td><button className="table-action" onClick={action}><MoreVertical size={17} /></button></td></tr>)}</tbody></table></div></section>; }
function QuickAction({ icon: Icon, title, text, onClick }: { icon: typeof QrCode; title: string; text: string; onClick: () => void }) { return <button className="quick-action" onClick={onClick}><div className="quick-icon"><Icon size={21} /></div><div><strong>{title}</strong><span>{text}</span></div><ChevronRight size={17} /></button>; }
function SettingsBlock({ icon: Icon, title, text, onClick }: { icon: typeof Settings; title: string; text: string; onClick: () => void }) { return <button className="settings-block" onClick={onClick}><div className="settings-icon"><Icon size={22} /></div><div><strong>{title}</strong><span>{text}</span></div><ChevronRight size={18} /></button>; }
function Status({ value }: { value: string }) { const normalized = value.toLowerCase(); const tone = normalized.includes('receb') || normalized.includes('conclu') || normalized.includes('emitida') || normalized.includes('em dia') || normalized === 'ativo' || normalized === 'confirmada' ? 'success' : normalized.includes('venc') || normalized.includes('inadimpl') || normalized.includes('erro') ? 'danger' : normalized.includes('aguard') || normalized.includes('pend') || normalized.includes('análise') || normalized.includes('agend') || normalized.includes('process') ? 'warning' : 'neutral'; return <span className={`status ${tone}`}>{value}</span>; }
function ChargeWizard({ step, setStep, onClose, onFinish }: { step: number; setStep: (step: number) => void; onClose: () => void; onFinish: () => void }) { const steps = ['Dados da cobrança', 'Forma de pagamento', 'Dados do cliente', 'Resumo']; return <div className="overlay" onMouseDown={onClose}><div className="wizard" onMouseDown={(event) => event.stopPropagation()}><div className="wizard-head"><div><span className="eyebrow">NOVA COBRANÇA</span><h2>{steps[step - 1]}</h2></div><button className="ghost-icon" onClick={onClose}><X size={20} /></button></div><div className="stepper">{steps.map((label, index) => <div key={label} className={index + 1 <= step ? 'step active' : 'step'}><span>{index + 1}</span><small>{label}</small></div>)}</div><div className="wizard-body">{step === 1 && <><div className="choice-grid"><button className="choice selected"><ReceiptText size={20} /><strong>Avulsa</strong><span>Uma única cobrança</span></button><button className="choice"><Calculator size={20} /><strong>Parcelamento</strong><span>Dividida em parcelas</span></button><button className="choice"><RefreshCw size={20} /><strong>Assinatura</strong><span>Cobrança recorrente</span></button></div><div className="form-grid"><label>Valor da cobrança<input placeholder="R$ 0,00" defaultValue="1.290,00" /></label><label>Vencimento<input type="date" defaultValue="2026-09-20" /></label></div><label>Descrição<input placeholder="Descreva o que está sendo cobrado" defaultValue="Serviço demonstrativo" /></label></>}{step === 2 && <><h3>Como seu cliente poderá pagar?</h3><div className="choice-grid"><button className="choice selected"><QrCode size={20} /><strong>Boleto / Pix</strong><span>Fluxo visual demonstrativo</span></button><button className="choice"><CreditCard size={20} /><strong>Cartão de crédito</strong><span>Pagamento simulado</span></button><button className="choice"><Smartphone size={20} /><strong>Pix</strong><span>QR Code demonstrativo</span></button></div><div className="form-grid"><label>Multa<select><option>Sem multa</option><option>2%</option></select></label><label>Juros<select><option>Sem juros</option><option>1% ao mês</option></select></label></div></>}{step === 3 && <><h3>Selecione ou cadastre um cliente</h3><label>Cliente<select><option>Marina Souza</option><option>Almeida Engenharia</option><option>Prime Decor</option><option>Novo cliente...</option></select></label><div className="form-grid"><label>E-mail<input defaultValue="marina@empresa.com.br" /></label><label>Telefone<input defaultValue="(47) 9 8765-1020" /></label></div><label>Enviar notificações<select><option>Sim, por e-mail e WhatsApp</option><option>Não enviar</option></select></label></>}{step === 4 && <div className="summary-box"><div><span>Tipo</span><strong>Avulsa</strong></div><div><span>Valor</span><strong>R$ 1.290,00</strong></div><div><span>Forma de pagamento</span><strong>Boleto / Pix</strong></div><div><span>Cliente</span><strong>Marina Souza</strong></div><div><span>Vencimento</span><strong>20/09/2026</strong></div><div className="info-box full-span">Ao finalizar, apenas um registro demonstrativo será criado na interface. Nenhum boleto, Pix ou pagamento real será emitido.</div></div>}</div><div className="wizard-footer"><button className="secondary-button" onClick={() => step === 1 ? onClose() : setStep(step - 1)}>{step === 1 ? 'Cancelar' : 'Voltar'}</button><button className="primary-button" onClick={() => step === 4 ? onFinish() : setStep(step + 1)}>{step === 4 ? 'Finalizar demonstração' : 'Avançar'} <ChevronRight size={15} /></button></div></div></div>; }

function getPageTitle(page: Page) { const titles: Record<Page, string> = { summary: 'Resumo', 'charges-all': 'Todas as cobranças', 'charges-single': 'Cobranças avulsas', 'charges-installments': 'Parcelamentos', 'charges-subscriptions': 'Assinaturas', 'charges-simulator': 'Simulador de vendas', 'payment-links': 'Links de Pagamento', customers: 'Clientes', groups: 'Grupos', 'pix-transactions': 'Pix · Transações', 'pix-transfers': 'Pix · Transferências', statement: 'Extrato', 'bill-payments': 'Pague Contas', card: 'Cartão', 'anticipations-all': 'Antecipações', 'anticipations-simulator': 'Simular antecipação', negotiation: 'Negativação', 'invoices-all': 'Notas Fiscais', 'invoices-settings': 'Configurações de Notas Fiscais', settings: 'Configurações' }; return titles[page]; }
function getPageSubtitle(page: Page) { const subtitles: Partial<Record<Page, string>> = { summary: 'Acompanhe os principais indicadores da sua operação financeira.', 'charges-all': 'Consulte, filtre e gerencie todo o ciclo de cobranças.', 'charges-single': 'Cobranças pontuais criadas para clientes específicos.', 'charges-installments': 'Compras divididas em várias cobranças vinculadas.', 'charges-subscriptions': 'Cobranças recorrentes e seus próximos vencimentos.', 'charges-simulator': 'Simule vendas e taxas sem gerar qualquer transação.', 'payment-links': 'Crie e acompanhe links de cobrança demonstrativos.', customers: 'Cadastros, contatos, situação e histórico da carteira.', groups: 'Organize clientes em grupos para ações em conjunto.', 'pix-transactions': 'Envios, recebimentos e QR Codes em modo demonstração.', 'pix-transfers': 'Histórico visual de transferências e agendamentos.', statement: 'Visualize entradas, saídas, taxas e saldo da conta.', 'bill-payments': 'Fluxo de leitura e pagamento de boletos demonstrativos.', card: 'Gestão visual de cartão empresarial.', 'anticipations-all': 'Solicitações e histórico de antecipações simuladas.', 'anticipations-simulator': 'Simule propostas de antecipação de recebíveis.', negotiation: 'Gerencie fluxos demonstrativos de negativação.', 'invoices-all': 'Notas fiscais vinculadas às cobranças do ambiente demo.', 'invoices-settings': 'Cadastre dados fiscais, serviços e regras de automação.', settings: 'Conta, notificações, taxas, limites e personalização.' }; return subtitles[page] ?? ''; }
function canCreate(page: Page) { return ['charges-all', 'charges-single', 'charges-installments', 'charges-subscriptions', 'payment-links', 'customers', 'groups', 'invoices-all'].includes(page); }
function getActionLabel(page: Page) { if (page === 'customers') return 'Adicionar cliente'; if (page === 'groups') return 'Adicionar grupo'; if (page === 'payment-links') return 'Adicionar link'; if (page === 'invoices-all') return 'Emitir nota'; if (page === 'charges-subscriptions') return 'Adicionar assinatura'; return 'Criar cobrança'; }
function currency(value: number) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
