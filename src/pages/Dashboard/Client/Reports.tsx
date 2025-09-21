import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'

const ReportsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Relatórios Detalhados</h1>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">A funcionalidade completa de relatórios e tabela de transações será implementada aqui.</p>
          {/* Placeholder for table */}
          <div className="mt-4 h-64 bg-gray-800 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Tabela de Transações</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportsPage
