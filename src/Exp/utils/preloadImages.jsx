const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

export const preloadImgs = (dataObj) => {
  Object.values(dataObj).forEach(entry => {
    preloadImage(entry.mainImg);
    if(entry.miniImgs) entry.miniImgs.forEach(preloadImage);
  });
};