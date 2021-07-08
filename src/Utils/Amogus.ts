import axios from 'axios';

interface IData {
  [key: string]: any;
}

interface IParams {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  data?: IData;
}

const Amogus = async (params: IParams, clean: boolean = true) => {
  try {
    const res = await axios(params);
    return [clean ? res.data : res, null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
};

export default Amogus;
