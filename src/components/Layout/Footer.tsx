import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="text-2xl font-bold text-white">
              <span className="text-yellow-400">ATLAS</span>
            </div>
            <p className="text-gray-400 text-base">
              Seu patrimônio no futuro. Construído hoje. Utilizamos inteligência artificial 
              e estratégias exclusivas para investidores de alta renda.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Plataforma
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="/#about" className="text-base text-gray-400 hover:text-white">
                      Sobre
                    </a>
                  </li>
                  <li>
                    <a href="/#how-it-works" className="text-base text-gray-400 hover:text-white">
                      Como Funciona
                    </a>
                  </li>
                  <li>
                    <a href="/#results" className="text-base text-gray-400 hover:text-white">
                      Resultados
                    </a>
                  </li>
                  <li>
                    <a href="/#plans" className="text-base text-gray-400 hover:text-white">
                      Planos
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Suporte
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="/#faq" className="text-base text-gray-400 hover:text-white">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <Link to="/support" className="text-base text-gray-400 hover:text-white">
                      Falar com Especialista
                    </Link>
                  </li>
                  <li>
                    <a href="/#contact" className="text-base text-gray-400 hover:text-white">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>
             <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/terms-of-service" className="text-base text-gray-400 hover:text-white">
                      Termos de Uso
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" className="text-base text-gray-400 hover:text-white">
                      Política de Privacidade
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2025 Atlas Capital & AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
