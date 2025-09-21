import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuthContext } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { LifeBuoy, Send } from 'lucide-react'

const supportSchema = z.object({
  subject: z.string().min(5, { message: 'O assunto deve ter pelo menos 5 caracteres.' }),
  message: z.string().min(20, { message: 'A mensagem deve ter pelo menos 20 caracteres.' }),
})

type SupportFormValues = z.infer<typeof supportSchema>

const Support: React.FC = () => {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
  })

  const onSubmit = async (data: SupportFormValues) => {
    if (!user) {
      setFormMessage({ type: 'error', text: 'Você precisa estar logado para enviar um ticket.' })
      return
    }

    setLoading(true)
    setFormMessage(null)

    try {
      const { error } = await supabase.from('support_tickets').insert({
        user_id: user.id,
        subject: data.subject,
        message: data.message,
        status: 'open',
        priority: 'medium',
      })

      if (error) throw error

      setFormMessage({ type: 'success', text: 'Seu ticket foi enviado com sucesso! Nossa equipe responderá em breve.' })
      reset()
    } catch (error: any) {
      setFormMessage({ type: 'error', text: error.message || 'Ocorreu um erro ao enviar seu ticket. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <LifeBuoy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white">Precisa de Ajuda?</h1>
          <p className="text-lg text-gray-400 mt-2">Envie-nos uma mensagem e nossa equipe de especialistas irá ajudá-lo.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Abrir um Novo Ticket de Suporte</CardTitle>
            <CardDescription>Descreva seu problema ou dúvida em detalhes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formMessage && (
                <div className={`p-3 rounded-md text-sm ${formMessage.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                  {formMessage.text}
                </div>
              )}

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Assunto</label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                />
                {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : <><Send className="h-4 w-4" /> Enviar Ticket</>}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Support
