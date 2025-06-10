const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

export const preloadImgs = (dataObj) => {
  Object.values(dataObj).forEach(entry => {
    preloadImage(entry.mainImg);
    entry.miniImgs.forEach(preloadImage);
  });
};