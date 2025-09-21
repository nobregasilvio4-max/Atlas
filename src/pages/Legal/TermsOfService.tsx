import React from 'react'

const TermsOfService: React.FC = () => {
  return (
    <div className="py-20 px-4 text-gray-300">
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
        <h1>Termos de Uso</h1>
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e usar a plataforma Atlas Capital & AI ("Plataforma"), você concorda em cumprir e
          estar vinculado a estes Termos de Uso. Se você não concordar com estes termos, não use a Plataforma.
        </p>

        <h2>2. Descrição do Serviço</h2>
        <p>
          A Atlas Capital & AI fornece uma plataforma de software como serviço (SaaS) para gestão de investimentos
          utilizando inteligência artificial. Os serviços incluem, mas não se limitam a, análise de portfólio,
          relatórios de desempenho e gestão de assinaturas.
        </p>

        <h2>3. Contas de Usuário</h2>
        <p>
          Para acessar a maioria dos recursos da Plataforma, você deve se registrar para uma conta. Você é
          responsável por manter a confidencialidade de sua senha e conta e é totalmente responsável
          por todas as atividades que ocorrem sob sua conta.
        </p>
        
        <h2>4. Isenção de Responsabilidade de Investimento</h2>
        <p>
          A Atlas Capital & AI não é uma consultoria de investimentos registrada. As informações e ferramentas
          fornecidas na Plataforma são apenas para fins informacionais e não devem ser consideradas como
          aconselhamento financeiro. O desempenho passado não é indicativo de resultados futuros.
        </p>

        <h2>5. Limitação de Responsabilidade</h2>
        <p>
          Em nenhuma circunstância a Atlas Capital & AI será responsável por quaisquer danos diretos, indiretos,
          incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar a Plataforma.
        </p>

        <p>...</p>
      </div>
    </div>
  )
}

export default TermsOfService
