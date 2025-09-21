import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card'
import { CheckCircle } from 'lucide-react'

const InvestPage: React.FC = () => {
  // Mock data - in a real app, this would come from Supabase
  const plans = [
    { name: 'Atlas Prime', price: 1500, features: ['Feature A', 'Feature B'] },
    { name: 'Atlas Elite', price: 3000, features: ['All of Prime', 'Feature C', 'Feature D'], popular: true },
    { name: 'Atlas Infinity', price: 10000, features: ['All of Elite', 'Feature E', 'Feature F'], soldOut: true },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Investir ou Mudar de Plano</h1>
      <p className="text-gray-400 mb-8">Escolha o plano que melhor se adapta aos seus objetivos.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-yellow-400' : ''}`}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>R$ {plan.price.toLocaleString('pt-BR')} / mês</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <ul className="space-y-2 mb-6 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={plan.soldOut}
                className="w-full mt-auto py-2 px-4 rounded-lg font-semibold text-center block transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              >
                {plan.soldOut ? 'Esgotado' : 'Selecionar Plano'}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default InvestPage
