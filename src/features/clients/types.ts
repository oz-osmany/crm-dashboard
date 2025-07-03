
export type ActivityType = 'notes' | 'email' | 'call' | 'task';

export interface ActivityItem {
  id: number;
  client_id: number;
  user_id: number;
  tipo: ActivityType;
  contenido: string;
  fecha: string; // formato ISO string
  created_at: string;
  description: string;
  summary: string;
  subject: string;
  body: string;
}





