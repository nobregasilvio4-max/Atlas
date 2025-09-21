import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Configurações da Conta</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Atualizar Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">O formulário para atualizar o nome e email do usuário será implementado aqui.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">O formulário para alterar a senha será implementado aqui.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
