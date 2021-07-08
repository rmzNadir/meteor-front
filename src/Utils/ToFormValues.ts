import { IObject } from '../Types';

const reject = ['id', 'created_at', 'updated_at'];

const ToFormValues = (object: IObject) => {
  return Object.fromEntries(
    Object.entries(object)
      .map(([key, val]) => {
        switch (true) {
          case key === 'image':
            return [
              key,
              { id: val.id, name: val.filename, created_at: val.created_at },
            ];
          case typeof val === 'boolean':
            return [key, val];
          case Array.isArray(val):
            return [key, val.map((v: IObject) => v.id)];
          case val && typeof val === 'object':
            return [key, val];
          default:
            return [key, String(val)];
        }
      })
      .filter(([key]) => !reject.includes(key))
  );
};

export default ToFormValues;
