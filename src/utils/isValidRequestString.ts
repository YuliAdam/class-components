const ERROR_REQUESTS_SYMBOLS = ['.', '/', '?'];

export default function isValidRequestString(str: string) {
  if (!str) return false;
  let resultStr = str;
  ERROR_REQUESTS_SYMBOLS.forEach((i) => {
    resultStr = resultStr.replaceAll(i, '');
  });
  return !!resultStr;
}
