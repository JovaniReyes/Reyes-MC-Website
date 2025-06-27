
import icons from "../../Utils/preLoadUIImages";

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

/** Preload everything from this barrel (call once, e.g. in a top-level useEffect). */
export const preloadButtonImages = () => {
  Object.values(icons).forEach(preloadImage);
};

export const preloadImgs = (dataObj) => {
  Object.values(dataObj).forEach(entry => {
    preloadImage(entry.mainImg);
    if(entry.miniImgs) entry.miniImgs.forEach(preloadImage);
  });
};