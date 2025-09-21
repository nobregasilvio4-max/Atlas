import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
  Download,
  Bell,
  Settings,
  AlertCircle
} from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Transaction, Investment, Subscription, ChartData } from '../../types'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm p-2 border border-gray-700 rounded-lg">
        <p className="label text-gray-300">{`${label}`}</p>
        <p className="intro text-brand-yellow-400">{`Valor : R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
      </div>
    );
  }
  return null;
};


interface DashboardStats {
  totalInvested: number
  projectedGains: number
  activeInvestments: number
  nextPayment: string
}

const ClientDashboard: React.FC = () => {
  const { user } = useAuthContext()
  const [stats, setStats] = useState<DashboardStats>({
    totalInvested: 0,
    projectedGains: 0,
    activeInvestments: 0,
    nextPayment: ''
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const pdfRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      if (!user) return;

      const { data: investmentsData } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active') as { data: Investment[] }

      const { data: subscriptionsData } = await supabase
        .from('subscriptions')
        .select('*, plan:plans(*)')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .limit(1) as { data: (Subscription & { plan: any })[] }

      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3) as { data: Transaction[] }

      const totalInvested = investmentsData?.reduce((sum, i) => sum + i.amount, 0) || 0
      const projectedGains = investmentsData?.reduce((sum, i) => sum + i.projected_return, 0) || 0

      setStats({
        totalInvested,
        projectedGains,
        activeInvestments: investmentsData?.length || 0,
        nextPayment: subscriptionsData?.[0]?.current_period_end ? format(new Date(subscriptionsData[0].current_period_end), 'dd/MM/yyyy') : 'N/A'
      })
      setTransactions(transactionsData || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDownloadPdf = async () => {
    const input = pdfRef.current;
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        backgroundColor: '#111827',
        scale: 2,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`relatorio-atlas-capital-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const performanceData = useMemo<ChartData[]>(() => {
    const data: ChartData[] = [];
    let lastValue = stats.totalInvested > 0 ? stats.totalInvested * 0.8 : 50000;
    for (let i = 6; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      lastValue = lastValue * (1 + (Math.random() * 0.1 - 0.02)); // Simulate growth
      data.push({
        date: format(date, 'MMM/yy', { locale: ptBR }),
        valor: parseFloat(lastValue.toFixed(0)),
      });
    }
    return data;
  }, [stats.totalInvested]);

  const quickActions = [
    { icon: <CreditCard className="h-6 w-6" />, title: 'Novo Investimento', description: 'Aplicar em novos planos', link: '/dashboard/invest' },
    { icon: <FileText className="h-6 w-6" />, title: 'Relatórios', description: 'Ver performance detalhada', link: '/dashboard/reports' },
    { icon: <Download className="h-6 w-6" />, title: 'Exportar Dados', description: 'Baixar extratos em PDF', action: handleDownloadPdf },
    { icon: <Settings className="h-6 w-6" />, title: 'Configurações', description: 'Gerenciar conta', link: '/dashboard/settings' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-yellow-400"></div>
      </div>
    )
  }

  return (
    <div ref={pdfRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo de volta, {user?.user_metadata?.full_name || 'Investidor'}
          </h1>
          <p className="text-gray-400">Acompanhe o crescimento do seu patrimônio em tempo real</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Total Investido</CardTitle><DollarSign className="h-6 w-6 text-brand-yellow-400" /></CardHeader><CardContent><div className="text-2xl font-bold">R$ {stats.totalInvested.toLocaleString('pt-BR')}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Ganhos Projetados</CardTitle><TrendingUp className="h-6 w-6 text-green-400" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-400">R$ {stats.projectedGains.toLocaleString('pt-BR')}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Investimentos Ativos</CardTitle><Calendar className="h-6 w-6 text-blue-400" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.activeInvestments}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Próximo Pagamento</CardTitle><Bell className="h-6 w-6 text-orange-400" /></CardHeader><CardContent><div className="text-xl font-semibold">{stats.nextPayment}</div></CardContent></Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const content = (
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-brand-yellow-400/10 rounded-lg text-brand-yellow-400">{action.icon}</div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                  </div>
                </div>
              );

              const motionProps = {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.1 },
                className: "bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-brand-yellow-400 transition-colors text-left w-full h-full"
              };

              if (action.link) {
                return <Link to={action.link} key={index}><motion.div {...motionProps}>{content}</motion.div></Link>;
              }
              
              return <motion.button key={index} {...motionProps} onClick={action.action}>{content}</motion.button>;
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3">
            <CardHeader><CardTitle>Performance do Portfolio</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${Number(value) / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="valor" stroke="#FBBF24" strokeWidth={2} dot={{ r: 4, fill: '#FBBF24', strokeWidth: 2, stroke: '#111827' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Transações Recentes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {transactions.length > 0 ? transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium capitalize">{transaction.description || transaction.type}</h3>
                    <p className="text-gray-400 text-sm">{format(new Date(transaction.created_at), 'dd/MM/yyyy')}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === 'return' ? 'text-green-400' : 'text-white'}`}>
                      {transaction.type === 'return' ? '+' : ''} R$ {transaction.amount.toLocaleString('pt-BR')}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs bg-green-900 text-green-200 rounded capitalize">{transaction.status}</span>
                  </div>
                </div>
              )) : <p className="text-gray-400">Nenhuma transação recente.</p>}
            </CardContent>
          </Card>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-brand-yellow-400/10 border border-brand-yellow-400/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-brand-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-brand-yellow-400">Oportunidade de Upgrade</h3>
              <p className="text-gray-300 text-sm mt-1">Com base no seu perfil, recomendamos o upgrade para o plano Atlas Elite para maximizar seus retornos.</p>
              <Link to="/dashboard/invest" className="text-brand-yellow-400 hover:text-brand-yellow-300 text-sm mt-2 underline">Saber mais →</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ClientDashboard
