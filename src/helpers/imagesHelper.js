/**
 * @function convertToWebp
 * @description Converts an image file (PNG or JPG) to WebP format with a quality of 0.8.
 * @param {File} file - The image file to convert. Only PNG and JPG files are supported.
 * @returns {Promise<string>} A promise that resolves with the base64 representation of the converted WebP image. The promise rejects with an error if the file type is not supported or if an error occurs during the conversion process.
 */
export function convertToWebp(file) {
  return new Promise((resolve, reject) => {
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      reject(new Error('File type not supported. Only PNG and JPG are allowed.'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result;

      const img = new Image();
      img.src = base64String;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const webpBase64 = canvas.toDataURL('image/webp', 0.8);
        resolve(webpBase64);
      };

      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}