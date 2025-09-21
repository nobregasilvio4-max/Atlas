import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  Settings,
  UserPlus,
  FileText,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Transaction, Profile, ChartData } from '../../types'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm p-2 border border-gray-700 rounded-lg">
        <p className="label text-gray-300">{`${label}`}</p>
        <p className="intro text-brand-yellow-400">{`Receita : R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
      </div>
    );
  }
  return null;
};

interface AdminStats {
  totalUsers: number
  totalRevenue: number
  activeSubscriptions: number
  monthlyGrowth: number
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
    monthlyGrowth: 0
  })
  const [recentActivities, setRecentActivities] = useState<(Transaction & { profiles: Profile })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact' }).eq('role', 'client')
      const { data: transactionsData } = await supabase.from('transactions').select('amount').eq('status', 'completed').eq('type', 'payment')
      const { count: subscriptionCount } = await supabase.from('subscriptions').select('*', { count: 'exact' }).eq('status', 'active')
      const { data: activityData } = await supabase.from('transactions').select('*, profiles(full_name)').order('created_at', { ascending: false }).limit(3) as { data: any[] }

      const totalRevenue = transactionsData?.reduce((sum, t) => sum + t.amount, 0) || 0

      setStats({
        totalUsers: userCount || 0,
        totalRevenue,
        activeSubscriptions: subscriptionCount || 0,
        monthlyGrowth: 12.5 // Mock data for now
      })
      setRecentActivities(activityData || [])
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const revenueData = useMemo<ChartData[]>(() => {
    const data: ChartData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        date: format(date, 'dd/MM'),
        receita: Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000,
      });
    }
    return data;
  }, []);

  const quickActions = [
    { icon: <UserPlus className="h-6 w-6" />, title: 'Gerenciar Usuários', description: 'Listar e editar clientes', link: '/admin/users', color: 'bg-blue-500' },
    { icon: <Settings className="h-6 w-6" />, title: 'Configurar Planos', description: 'Gerenciar planos', link: '/admin/plans', color: 'bg-green-500' },
    { icon: <CreditCard className="h-6 w-6" />, title: 'Gateways Pagamento', description: 'Configurar pagamentos', link: '#', color: 'bg-purple-500' },
    { icon: <FileText className="h-6 w-6" />, title: 'Relatórios', description: 'Gerar relatórios', link: '#', color: 'bg-orange-500' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-gray-400">Gerencie usuários, planos, pagamentos e monitore o crescimento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Total de Usuários</CardTitle><Users className="h-6 w-6 text-blue-400" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalUsers}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Receita Total</CardTitle><DollarSign className="h-6 w-6 text-green-400" /></CardHeader><CardContent><div className="text-2xl font-bold">R$ {stats.totalRevenue.toLocaleString('pt-BR')}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Assinaturas Ativas</CardTitle><CreditCard className="h-6 w-6 text-purple-400" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.activeSubscriptions}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-gray-400">Crescimento Mensal</CardTitle><TrendingUp className="h-6 w-6 text-brand-yellow-400" /></CardHeader><CardContent><div className="text-2xl font-bold text-brand-yellow-400">+{stats.monthlyGrowth}%</div></CardContent></Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link to={action.link} key={index}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-brand-yellow-400 transition-colors text-left h-full">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${action.color} rounded-lg text-white`}>{action.icon}</div>
                    <div><h3 className="font-semibold">{action.title}</h3><p className="text-gray-400 text-sm">{action.description}</p></div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3">
            <CardHeader><CardTitle>Receita Diária (Últimos 7 dias)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${Number(value) / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="receita" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Atividade Recente</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.length > 0 ? recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{activity.profiles?.full_name || 'Usuário'}</h3>
                    <p className="text-gray-400 text-sm capitalize">{activity.description || activity.type}</p>
                    <p className="text-gray-500 text-xs">{format(new Date(activity.created_at), 'Pp', { locale: ptBR })}</p>
                  </div>
                  <div className="text-right"><p className="font-semibold text-green-400">R$ {activity.amount.toLocaleString('pt-BR')}</p></div>
                </div>
              )) : <p className="text-gray-400">Nenhuma atividade recente.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
