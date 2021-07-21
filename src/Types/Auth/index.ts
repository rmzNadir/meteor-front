import { IImage } from '../Products';

export interface IUser {
  id: number;
  role: 'user' | 'admin' | 'client_user';
  email: string;
  last_name: string;
  name: string;
  password_digest: string;
  created_at: Date;
  updated_at: Date;
  image?: IImage;
}

export interface IUserTemp {
  role: 'user' | 'admin' | 'client_user';
  email: string;
  last_name: string;
  name: string;
  image?: IImage;
  password_confirmation: string;
  password: string;
}
