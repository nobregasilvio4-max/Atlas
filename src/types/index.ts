// Type for chart data points
export interface ChartData {
  date: string;
  [key: string]: number | string;
}

// Renaming User to Profile to avoid conflict with Supabase's User type
export interface Profile {
  id: string; // Corresponds to auth.users.id
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  stripe_price_id: string;
  is_popular?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'trialing' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  subscription_id?: string; // Can be null for direct investments
  amount: number;
  type: 'payment' | 'refund' | 'investment' | 'return';
  status: 'pending' | 'completed' | 'failed';
  gateway: string;
  gateway_transaction_id?: string;
  description: string;
  created_at: string;
}

export interface Investment {
  id: string;
  user_id: string;
  amount: number;
  projected_return: number;
  actual_return?: number;
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}
