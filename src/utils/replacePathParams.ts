import { PATH } from '../configs/routesConfig';

export function replacePathParams(
  path: string,
  param: {
    searchParam?: string;
    page?: string;
    item?: string;
  }
) {
  let result = path;
  if (param.searchParam) {
    result = result.replace(':searchParam', param.searchParam);
  }
  if (!param.searchParam && PATH.searchParam) {
    result = result.replace('&param=:searchParam', '');
  }
  if (param.page) result = result.replace(':num', param.page);
  if (param.item) {
    result = result.replace(':item', param.item);
    if (!param.searchParam && PATH.item) {
      result = result.replace('&param=:searchParam', '');
    }
  }
  return result;
}
