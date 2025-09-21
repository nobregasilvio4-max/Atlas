import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'

const UserManagementPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gerenciamento de Usuários</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">A funcionalidade completa de gerenciamento de usuários (CRUD) será implementada aqui.</p>
          <div className="mt-4 h-96 bg-gray-800 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Tabela de Usuários</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserManagementPage
