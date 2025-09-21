-- Desabilitar RLS temporariamente para criar as tabelas
alter schema public owner to postgres;
grant all on schema public to postgres;
grant all on schema public to anon;
grant all on schema public to authenticated;
grant all on schema public to service_role;

-- EXTENSIONS
create extension if not exists "uuid-ossp" with schema extensions;

-- CUSTOM TYPES
create type public.user_role as enum ('client', 'admin');
create type public.subscription_status as enum ('active', 'cancelled', 'expired', 'incomplete');
create type public.transaction_type as enum ('payment', 'refund');
create type public.transaction_status as enum ('pending', 'completed', 'failed');
create type public.investment_status as enum ('active', 'completed', 'cancelled');
create type public.ticket_status as enum ('open', 'in_progress', 'resolved', 'closed');
create type public.ticket_priority as enum ('low', 'medium', 'high', 'urgent');

-- TABELAS

-- Tabela de Perfis de Usuário
create table public.profiles (
  id uuid not null primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role public.user_role not null default 'client',
  updated_at timestamp with time zone
);
comment on table public.profiles is 'Profile data for each user.';
comment on column public.profiles.id is 'References the internal Supabase auth user.';

-- Tabela de Planos
create table public.plans (
  id uuid not null primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(10, 2) not null,
  features text[] not null,
  max_investment numeric(12, 2),
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);
comment on table public.plans is 'Available investment plans.';

-- Tabela de Assinaturas
create table public.subscriptions (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.plans(id) on delete restrict,
  status public.subscription_status not null,
  current_period_start timestamp with time zone not null,
  current_period_end timestamp with time zone not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);
comment on table public.subscriptions is 'User subscriptions to plans.';

-- Tabela de Transações
create table public.transactions (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  amount numeric(10, 2) not null,
  type public.transaction_type not null,
  status public.transaction_status not null,
  gateway text not null,
  gateway_transaction_id text,
  created_at timestamp with time zone not null default now()
);
comment on table public.transactions is 'Records of all payments and refunds.';

-- Tabela de Investimentos
create table public.investments (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(12, 2) not null,
  projected_return numeric(12, 2) not null,
  actual_return numeric(12, 2),
  start_date timestamp with time zone not null,
  end_date timestamp with time zone,
  status public.investment_status not null,
  created_at timestamp with time zone not null default now()
);
comment on table public.investments is 'Specific investment operations for users.';

-- Tabela de Tickets de Suporte
create table public.support_tickets (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  message text not null,
  status public.ticket_status not null default 'open',
  priority public.ticket_priority not null default 'medium',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);
comment on table public.support_tickets is 'Support tickets submitted by users.';

-- FUNÇÕES E TRIGGERS

-- Função para criar um perfil de usuário automaticamente
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'client');
  return new;
end;
$$;

-- Trigger para executar a função acima quando um novo usuário se registra
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper para obter a role do usuário a partir do JWT
create or replace function public.get_my_role()
returns text
language sql stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::jsonb->>'user_role', '')::text;
$$;


-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY)

-- Ativar RLS para todas as tabelas
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.transactions enable row level security;
alter table public.investments enable row level security;
alter table public.support_tickets enable row level security;

-- Políticas para a tabela 'profiles'
create policy "Users can view their own profile."
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile."
  on public.profiles for update
  using ( auth.uid() = id );

create policy "Admins can view and manage all profiles."
  on public.profiles for all
  using ( public.get_my_role() = 'admin' );

-- Políticas para a tabela 'plans'
create policy "All authenticated users can view plans."
  on public.plans for select
  using ( auth.role() = 'authenticated' );

create policy "Admins can manage plans."
  on public.plans for all
  using ( public.get_my_role() = 'admin' );

-- Políticas para as tabelas restantes (subscriptions, transactions, etc.)
create policy "Users can manage their own data."
  on public.subscriptions for all
  using ( auth.uid() = user_id );

create policy "Users can manage their own data."
  on public.transactions for all
  using ( auth.uid() = user_id );

create policy "Users can manage their own data."
  on public.investments for all
  using ( auth.uid() = user_id );

create policy "Users can manage their own data."
  on public.support_tickets for all
  using ( auth.uid() = user_id );

-- Políticas de Admin para as tabelas restantes
create policy "Admins can manage all data."
  on public.subscriptions for all
  using ( public.get_my_role() = 'admin' );

create policy "Admins can manage all data."
  on public.transactions for all
  using ( public.get_my_role() = 'admin' );

create policy "Admins can manage all data."
  on public.investments for all
  using ( public.get_my_role() = 'admin' );

create policy "Admins can manage all data."
  on public.support_tickets for all
  using ( public.get_my_role() = 'admin' );


-- DADOS INICIAIS

-- Inserir os planos
insert into public.plans (name, description, price, features, max_investment)
values
  (
    'Atlas Prime',
    'Para investidores iniciantes que buscam crescimento consistente.',
    50000.00,
    '{
      "Carteira diversificada premium",
      "Relatórios mensais detalhados",
      "Suporte via chat e email",
      "Rebalanceamento trimestral",
      "Análise de risco personalizada",
      "Acesso a webinars exclusivos"
    }',
    124999.99
  ),
  (
    'Atlas Elite',
    'Para investidores experientes que procuram resultados excepcionais.',
    125000.00,
    '{
      "Tudo do Atlas Prime",
      "Gestor dedicado disponível",
      "Análise IA em tempo real",
      "Acesso a oportunidades privadas",
      "Relatórios semanais",
      "Rebalanceamento automático",
      "Call mensal com analistas",
      "Projeção de capital avançada"
    }',
    499999.99
  ),
  (
    'Atlas Infinity',
    'Para investidores de alto patrimônio que procuram exclusividade.',
    500000.00,
    '{
      "Tudo do Atlas Elite",
      "Estratégias ultra personalizadas",
      "Acesso a family office",
      "Gestão patrimonial completa",
      "Consultoria fiscal internacional",
      "Eventos VIP exclusivos",
      "Linha direta 24/7",
      "Assessoria de legado familiar"
    }',
    null
  );
