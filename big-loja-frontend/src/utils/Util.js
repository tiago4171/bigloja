/**
 * 
 * @param {File} file 
 */
export const fileToImageBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
      return fileReader.readAsDataURL(file);
  });
}


export const defaultClassName = {
  width: '30%',
  boxSizing: 'border-box',
  border: '5px',
  justifyContent: 'center',
  alignContent: 'center',
};

export const defaultColumn = {
  span: '4',
  offset: 4,
};

export const registerUpload = {
  span: 2,
  offset: 2,
};
