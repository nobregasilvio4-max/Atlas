import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Shield, 
  Globe, 
  Brain, 
  Users, 
  Award,
  ChevronDown,
  CheckCircle,
  Star
} from 'lucide-react'

const Landing: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const plans = [
    {
      name: 'Atlas Prime',
      promotionalPrice: 1500,
      originalPrice: 2350,
      investmentMinimum: 50000,
      description: 'Para investidores iniciantes que buscam crescimento consistente.',
      features: [
        'Carteira diversificada premium',
        'Relatórios mensais detalhados',
        'Suporte via chat e email',
        'Rebalanceamento trimestral',
        'Análise de risco personalizada',
        'Acesso a webinars exclusivos'
      ],
      buttonText: 'Solicitar Acesso Exclusivo',
      popular: false,
      isSoldOut: false,
    },
    {
      name: 'Atlas Elite',
      promotionalPrice: 3000,
      originalPrice: 4257,
      investmentMinimum: 125000,
      description: 'Para investidores experientes que procuram resultados excepcionais.',
      features: [
        'Tudo do Atlas Prime',
        'Gestor dedicado disponível',
        'Análise IA em tempo real',
        'Acesso a oportunidades privadas',
        'Relatórios semanais',
        'Rebalanceamento automático',
        'Call mensal com analistas',
        'Projeção de capital avançada'
      ],
      buttonText: 'Solicitar Acesso Exclusivo',
      popular: true,
      isSoldOut: false,
    },
    {
      name: 'Atlas Infinity',
      promotionalPrice: 10000,
      originalPrice: 15329,
      investmentMinimum: 500000,
      description: 'Para investidores de alto patrimônio que procuram exclusividade.',
      features: [
        'Tudo do Atlas Elite',
        'Estratégias ultra personalizadas',
        'Acesso a family office',
        'Gestão patrimonial completa',
        'Consultoria fiscal internacional',
        'Eventos VIP exclusivos',
        'Linha direta 24/7',
        'Assessoria de legado familiar'
      ],
      buttonText: 'Esgotado',
      popular: false,
      isSoldOut: true,
    }
  ]

  const testimonials = [
    {
      name: 'Ricardo Silva',
      role: 'CEO Tech4You Finance',
      content: 'A Atlas desenvolveu completamente a forma como vejo os meus investimentos. Os resultados superam todas as minhas expectativas.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Ana Martins',
      role: 'Diretora Financeira Ouro Martins',
      content: 'Através da plataforma que mudaram a dinâmica das minhas finanças sem contradições. A experiência foi excecional.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Empresário Ramos Holdings',
      content: 'Com a Atlas, finalmente encontrei uma parceria de investimentos que me proporcionou resultados e objetivos de longo prazo.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ]

  const faqItems = [
    {
      question: 'O que é a Atlas Capital & AI?',
      answer: 'A Atlas Capital & AI é uma gestora de investimentos especializada em capital, gestão e multiplicação patrimonial através da inteligência artificial e estratégias exclusivas para investidores de alta renda.'
    },
    {
      question: 'Como funciona o acesso após contratação?',
      answer: 'Após a contratação, você receberá acesso ao painel exclusivo onde poderá acompanhar seus investimentos em tempo real, relatórios detalhados e comunicação direta com nossos analistas.'
    },
    {
      question: 'A plataforma é adequada para iniciantes?',
      answer: 'Sim, oferecemos planos adequados para diferentes perfis de investidor, desde iniciantes até investidores experientes, com suporte e educação financeira personalizada.'
    },
    {
      question: 'Qual é o valor mínimo de investimento?',
      answer: 'O investimento mínimo varia conforme o plano escolhido, começando em R$ 50.000 para o Atlas Prime, proporcionando acesso a estratégias profissionais de investimento.'
    },
    {
      question: 'Como funciona a segurança dos investimentos?',
      answer: 'Utilizamos as mais avançadas tecnologias de segurança, criptografia de dados, auditoria externa e seguimos rigorosamente as regulamentações do mercado financeiro brasileiro.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Seu Patrimônio no Futuro.
              <br />
              <span className="text-yellow-400">Construído Hoje.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Na Atlas Capital & AI, captamos, gerimos e multiplicamos o seu investimento com 
              inteligência artificial e estratégias exclusivas para investidores de alta renda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
              >
                Quero Multiplicar Meu Patrimônio →
              </Link>
              <a
                href="#about"
                className="border border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors inline-flex items-center justify-center"
              >
                Descobrir Mais
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-yellow-400" />
        </motion.div>
      </section>

      {/* About AI Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                A nova corrida do ouro está na
                <br />
                <span className="text-yellow-400">Inteligência Artificial</span>
              </h2>
              
              <p className="text-gray-300 text-lg mb-8">
                Dentro de 8 anos, apenas 10% do mercado de trabalho ainda não terá 
                sido substituído pela IA. O seu dinheiro precisa de capital 
                inteligente aplicado para acompanhar a vanguarda e sair na frente 
                de quem não está se antecipando em tecnologia financeira.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Rentabilidade Consistente</h3>
                    <p className="text-gray-400">
                      Nossos algoritmos são treinados para detectar oportunidades e maximizar retornos 
                      com base em análise preditiva de mercado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Exclusividade Global</h3>
                    <p className="text-gray-400">
                      Estratégias oferecidas apenas aos nossos clientes, desenvolvidas com machine learning 
                      e análise de dados em tempo real.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Segurança e Confiança</h3>
                    <p className="text-gray-400">
                      Tecnologia bancária de ponta protege todos os seus investimentos com criptografia 
                      e auditoria permanente.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="relative">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Inteligência Artificial"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>

          <motion.div {...fadeInUp} className="mt-16 text-center">
            <p className="text-yellow-400 text-lg font-semibold">
              Atlas Capital & AI - seu patrimônio na vanguarda da inteligência.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Descubra como iremos <span className="text-yellow-400">multiplicar seu patrimônio</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Um processo refinado, em 3 etapas que combina expertise humana com a 
              precisão da inteligência artificial.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-12 w-12 text-yellow-400" />,
                title: 'Captação Inteligente',
                description: 'Nossos algoritmos especializados captam através de redes neurais oportunidades embasadas na análise de mercado que te permitiram maximizar os retornos.'
              },
              {
                icon: <TrendingUp className="h-12 w-12 text-yellow-400" />,
                title: 'Inteligência Artificial',
                description: 'Nossos algoritmos processam milhões de dados para otimizar decisões e prever tendências futuras para maximizar investimentos.'
              },
              {
                icon: <Globe className="h-12 w-12 text-yellow-400" />,
                title: 'Multiplicação Consistente',
                description: 'Estratégias personalizadas que geram crescimento sustentável e multiplicação avançada do patrimônio através de técnicas inovadoras.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800 p-8 rounded-lg text-center border border-gray-700 hover:border-yellow-400/50 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Por que escolher a <span className="text-yellow-400">Atlas Capital & AI</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Diferenciais que nos tornam a escolha preferida de investidores exigentes em 
              todo o Brasil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Gestão com Algoritmos de IA',
                description: 'Estratégias proprietárias que nossa equipe desenvolveu para performance e gestão de risco.'
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: 'Estratégias Exclusivas',
                description: 'Acesso a oportunidades únicas para investidores de alto patrimônio.'
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: 'Compliance Global',
                description: 'Estrutura com auditoria internacional e transparência total de operações.'
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: 'Resultados em Qualquer Cenário',
                description: 'Performance consistente em diferentes cenários de mercado no Brasil e exterior.'
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: 'Atendimento Premium',
                description: 'Mesa exclusiva personalizada com gestores especializados disponíveis.'
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: 'Transparência Total',
                description: 'Relatórios detalhados e acesso em tempo real aos resultados dos seus investimentos.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors inline-block"
            >
              Solicitar Análise Personalizada
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Resultados que <span className="text-yellow-400">comprovam</span> nossa excelência
            </h2>
            <p className="text-gray-300 text-lg">
              Performance consistente que transforma objetivos em realidade para nossos 
              investidores.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-center mb-8">Performance dos Últimos 5 Anos</h3>
            
            <div className="space-y-6">
              {[
                { year: '2020', performance: '28.5%' },
                { year: '2021', performance: '31.2%' },
                { year: '2022', performance: '24.7%' },
                { year: '2023', performance: '29.8%' },
                { year: '2024', performance: '33.4%' }
              ].map((item, index) => (
                <div key={item.year} className="flex items-center justify-between">
                  <span className="text-lg font-medium">{item.year}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-yellow-400 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${parseFloat(item.performance) * 2.5}%` }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                      />
                    </div>
                  </div>
                  <span className="text-yellow-400 font-bold text-lg">{item.performance}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 mt-6 text-sm">
              * Resultados com base na rentabilidade acumulada e benchmark anual.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Eles confiaram em nossa expertise e <span className="text-yellow-400">transformaram</span> planos em
              <br />
              <span className="text-yellow-400">resultados reais</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-yellow-400 font-bold text-lg">
                    {testimonial.rating.toFixed(1)}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Você está pronto para o próximo ciclo de
              <br />
              <span className="text-yellow-400">crescimento exponencial?</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
              Se você possui a liquidez dos nossos critérios, esta é a sua chance de estar à frente. 
              Se aprovado o Bitcoin, saiba que não pode ignorar o próximo ciclo.
            </p>

            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors inline-block"
            >
              Ver Planos de Investimento
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Acesso Exclusivo à Vanguarda dos Investimentos
            </h2>
            <p className="text-gray-300 text-lg">
              Planos disponíveis para investidores qualificados e selecionados.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }}
                className={`bg-gray-900 rounded-lg p-8 border-2 relative flex flex-col h-full ${
                  plan.popular 
                    ? 'border-yellow-400' 
                    : 'border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                      MAIS POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm line-through">De R$ {plan.originalPrice.toLocaleString('pt-BR')}</p>
                  <p className="text-gray-300 text-sm">por apenas:</p>
                  <div className="text-4xl font-bold text-yellow-400 my-2">
                    R$ {plan.promotionalPrice.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-gray-400 text-sm">
                    Investimento mínimo de R$ {plan.investmentMinimum.toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={plan.isSoldOut ? '#' : '/register'}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-center block transition-colors mt-auto ${
                    plan.isSoldOut
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : plan.popular
                        ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                        : 'bg-gray-800 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900'
                  }`}
                  aria-disabled={plan.isSoldOut}
                  onClick={(e) => plan.isSoldOut && e.preventDefault()}
                >
                  {plan.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">FAQ</h2>
            <p className="text-gray-300 text-lg">
              Respostas às perguntas mais frequentes dos nossos investidores
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg border border-gray-700"
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <ChevronDown className="h-5 w-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-400">{item.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <p className="text-gray-400 mb-4">Não encontrou a resposta que procurava?</p>
            <Link
              to="/support"
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-block"
            >
              Falar com Especialista
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing
