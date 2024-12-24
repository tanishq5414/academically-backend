import { assign } from 'lodash';

let data: { [k: string]: any } = {};

const addToSingleton = (key: string, value: object): object => {
  data[key] = value;
  return value;
};

const getSingleton = (): { [k: string]: any } => {
  return data;
};

const addObjToSingleton = (obj: object): { [k: string]: any } => {
  data = assign(data, obj);
  return data;
};

export { addToSingleton, getSingleton, addObjToSingleton };
