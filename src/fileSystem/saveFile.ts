export default function saveFile(
  fileName: string,
  text: string,
  actionElement: HTMLAnchorElement | null
) {
  if (actionElement) {
    const file: Blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
    actionElement.href = URL.createObjectURL(file);
    actionElement.download = `${fileName}.csv`;
  }
}
