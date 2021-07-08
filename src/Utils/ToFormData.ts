interface IObject {
  [key: string]: any;
}

const ToFormData = (object: IObject) => {
  const formData = new FormData();
  Object.keys(object).forEach(
    (key) => object[key] !== undefined && formData.append(key, object[key])
  );
  return formData;
};

export default ToFormData;
