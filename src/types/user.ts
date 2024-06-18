import { Role } from "./role";

export interface User {
  id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  [key: string]: unknown;
  city?: string;
  county?: string;
  timezone?:string;
  isAdmin?:string;
  role?:Role | null;
}
