export interface Target {
  id?:string;
  _id?:string;
  name?: string;
  type?: string;
  emissionReduction?: string;
  baseYear?: string;
  targetYear?: string;
  [key: string]: unknown;
  createdAt?: string;
  timezone?: string;
  baseToTargetYear?:string;
}
