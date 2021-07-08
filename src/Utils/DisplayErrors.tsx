import { message } from 'antd';

interface IErrors {
  [key: string]: IError;
}

interface IError {
  [key: string]: string[];
}

const DisplayErrors = (errors: IErrors) => {
  const msgs = Object.values(errors).flat();
  msgs.forEach((m) => message.error(m));
};

export default DisplayErrors;
