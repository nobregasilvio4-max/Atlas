import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { resetPassword } = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await resetPassword(email)
      if (error) throw error
      setMessage('Um email de redefinição de senha foi enviado. Verifique sua caixa de entrada.')
    } catch (error: any) {
      setError(error.message || 'Erro ao enviar email de redefinição.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <Link to="/" className="flex justify-center">
            <div className="text-3xl font-bold text-white">
              <span className="text-yellow-400">ATLAS</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Redefinir Senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Insira seu email para receber o link de redefinição.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded">
              {message}
            </div>
          )}

          {!message && (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10"
                      placeholder="Endereço de email"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Enviar Link'}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="text-center">
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para o Login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
