export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
}

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