export default {
  resizeImage(dataUrl, imageType, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImageData = canvas.toDataURL(imageType);
        if (resizedImageData) resolve({ resizedImageData, imageType });
        else reject('Error resizing image');
      };
    });
  },
  getImageType(dataUrl) {
    return dataUrl.slice(0, dataUrl.indexOf(';')).slice(dataUrl.indexOf(':') + 1);
  },
};
