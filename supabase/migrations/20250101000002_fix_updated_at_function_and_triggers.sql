/*
# [Function] update_updated_at_column
Cria uma função de gatilho para atualizar automaticamente a coluna `updated_at` em qualquer tabela. Esta função é essencial para a auditoria de dados.

## Query Description:
Esta função é segura e garante que o campo `updated_at` de uma linha seja definido para o timestamp atual sempre que a linha for atualizada. A sua ausência no script anterior causou a falha na criação dos gatilhos.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Security Implications:
- RLS Status: N/A
- Policy Changes: No
- Auth Requirements: N/A
- Notes: Define um `search_path` seguro para a função, resolvendo o aviso de segurança "Function Search Path Mutable".

## Performance Impact:
- Indexes: N/A
- Triggers: Esta função é utilizada por gatilhos em várias tabelas.
- Estimated Impact: Impacto de desempenho insignificante nas operações de UPDATE.
*/
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Define um caminho de pesquisa seguro para mitigar o aviso de segurança.
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

-- =============================================================================
-- Recriação dos Gatilhos (Triggers)
-- Os gatilhos abaixo garantem que a coluna `updated_at` seja atualizada
-- automaticamente em cada modificação de registo.
-- =============================================================================

/*
# [Trigger] on_profiles_update
Atualiza `updated_at` na tabela `profiles`.
*/
CREATE OR REPLACE TRIGGER on_profiles_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

/*
# [Trigger] on_plans_update
Atualiza `updated_at` na tabela `plans`.
*/
CREATE OR REPLACE TRIGGER on_plans_update
  BEFORE UPDATE ON public.plans
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

/*
# [Trigger] on_subscriptions_update
Atualiza `updated_at` na tabela `subscriptions`.
*/
CREATE OR REPLACE TRIGGER on_subscriptions_update
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

/*
# [Trigger] on_support_tickets_update
Atualiza `updated_at` na tabela `support_tickets`.
*/
CREATE OR REPLACE TRIGGER on_support_tickets_update
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();
