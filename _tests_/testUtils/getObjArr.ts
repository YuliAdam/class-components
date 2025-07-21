import { IObjectInfoResponse } from '../../src/types/types';

export function getObjArr(obj: IObjectInfoResponse, num: number) {
  const objArr: IObjectInfoResponse[] = [];
  for (let i = 0; i < num; i++) {
    objArr.push(obj);
  }
  return objArr;
}
