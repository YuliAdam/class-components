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
  } else {
    if (path.includes('searchParam')) {
      result = result.replace('&param=:searchParam', '');
    }
  }
  if (param.page) {
    result = result.replace(':page', param.page);
  } else {
    if (path.includes('page')) {
      result = result.replace('?page=:page', '');
    }
  }
  if (param.item) {
    result = result.replace(':item', param.item);
  }
  return result;
}
