export default {
  resizeImage(dataUrl, imageType, maxWidth = 0, maxHeight = 0) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        let width = img.width;
        let height = img.height;

        if (maxWidth && width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        if (maxHeight && height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
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
  convertToBlob(dataUrl, type) {
    const binStr = atob(dataUrl.split(',')[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type || 'image/png' });
  },
};
