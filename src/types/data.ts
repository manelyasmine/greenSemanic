export interface Data {
  id?:string;
  _id?:string;
  date?: string;
  location?: string;
  category?: string;
  quantity?: string;
  emission_tracker?: string;
  source?: string;
  [key: string]: unknown;
  createdAt?: string;
}
