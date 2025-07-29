export default function getColor(num1: number, num2: number, num3: number) {
  function getResult(num: number) {
    return num > 256 ? num % 256 : num % 2 === 0 ? 256 - num : num;
  }
  return (
    'rgba(' +
    getResult(num1) +
    ',' +
    getResult(num2) +
    ',' +
    getResult(num3) +
    ', 0.4)'
  );
}
