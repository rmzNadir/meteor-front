export interface IUser {
  id: number;
  role: 'user' | 'admin' | 'client_user';
  email: string;
  last_name: string;
  name: string;
  password_digest: string;
  created_at: Date;
  updated_at: Date;
}
