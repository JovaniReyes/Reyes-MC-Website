// utils/preloadImages.js
import icons from "../../Utils/preLoadUIImages";   // barrel of UI icons

const IMG_RE = /\.(png|jpe?g|gif|webp|svg)$/i;

/* Low-level: fire off a request right away */
const preloadImage = (url) => {
  if (!url || !IMG_RE.test(url)) return;     // not an img → ignore
  const img = new Image();
  img.src = url;
};

/**
 * preloadImages( ...sources )
 * • Always preloads the UI-icon barrel.
 * • Accepts any mix of strings, objects, arrays, or maps.
 * • Deep-scans everything, de-dupes, and preloads every image it finds.
 *
 * Usage:
 *   preloadImages(ContentData, aboutMeData, projectData);
 */
export const preloadImages = (...sources) => {
  const queue = [
    ...Object.values(icons),   // UI icons are always included
    ...sources,
  ];

  const seen = new Set();      // de-dupe identical URLs
  const stack = [...queue];    // DFS

  while (stack.length) {
    const node = stack.pop();

    if (typeof node === "string") {
      if (!seen.has(node)) {
        seen.add(node);
        preloadImage(node);
      }
      continue;
    }

    if (Array.isArray(node)) {
      stack.push(...node);
    } else if (node && typeof node === "object") {
      stack.push(...Object.values(node));
    }
  }
};
