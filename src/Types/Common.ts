export interface IParams {
  id: string;
}

export interface IObject {
  [key: string]: any;
}

export interface IErrors {
  [key: string]: IError;
}

export interface IError {
  [key: string]: string[];
}
