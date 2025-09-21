import React from 'react'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-20 px-4 text-gray-300">
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
        <h1>Política de Privacidade</h1>
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <h2>1. Coleta de Informações</h2>
        <p>
          Coletamos informações que você nos fornece diretamente, como quando você cria uma conta,
          preenche um formulário ou se comunica conosco. As informações podem incluir seu nome, email,
          número de telefone e informações financeiras.
        </p>

        <h2>2. Uso das Informações</h2>
        <p>
          Usamos as informações que coletamos para operar, manter e fornecer os recursos e a
          funcionalidade da Plataforma, para nos comunicarmos com você, para processar transações e
          para personalizar sua experiência.
        </p>

        <h2>3. Compartilhamento de Informações</h2>
        <p>
          Não compartilhamos suas informações pessoais com terceiros, exceto conforme descrito nesta
          política ou com o seu consentimento. Podemos compartilhar informações com fornecedores de
          serviços que nos auxiliam na operação da Plataforma.
        </p>

        <h2>4. Segurança</h2>
        <p>
          Tomamos medidas razoáveis para proteger suas informações contra perda, roubo, uso indevido e
          acesso não autorizado. No entanto, nenhum sistema de segurança é impenetrável e não podemos
          garantir a segurança de nossos sistemas 100%.
        </p>

        <p>...</p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
