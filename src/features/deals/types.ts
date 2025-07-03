export type Datos = "nuevo" | "contactado" | "ganado" | "perdido";


export interface Deal {
  id?: number;
  client_id: number | string;
  title: string;
  amount: number;
  status: Datos;
  close_date: string;
  notes: string;
}
