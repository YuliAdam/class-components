import { expect, it, describe } from 'vitest';
import saveFile from '../../src/fileSystem/saveFile';

const mockData = {
  fileName: 'name',
  text: 'text',
  actionElement: <a></a>,
};

describe('replacePathParams', () => {
  it('should return path', () => {
    if (mockData.actionElement instanceof HTMLAnchorElement) {
      saveFile(mockData.fileName, mockData.text, mockData.actionElement);
      expect(mockData.actionElement.href).toBeTruthy();
      expect(mockData.actionElement.download).toEqual(
        `${mockData.fileName}.csv`
      );
    }
  });
});
