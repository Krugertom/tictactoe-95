// LLM NOTE: Wrote with chatGPTy to help fix some loading issues with fonts I was having with core react95 package 
import msSansSerif from 'react95/dist/fonts/ms_sans_serif.woff2';
import msSansSerifBold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

let loadPromise: Promise<void> | null = null;

const loadFont = (source: string, weight: string | undefined) =>
  new FontFace('ms_sans_serif', `url(${source}) format('woff2')`, {
    style: 'normal',
    weight,
    display: 'swap',
  }).load();

export const ensureReact95FontsLoaded = () => {
  if (typeof document === 'undefined' || typeof FontFace === 'undefined') {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = Promise.all([loadFont(msSansSerif, '400'), loadFont(msSansSerifBold, '700')])
    .then((loadedFonts) => {
      loadedFonts.forEach((font) => document.fonts.add(font));
    })
    .catch((error) => {
      loadPromise = null;
      console.error('Failed to load React95 fonts', error);
    });

  return loadPromise;
};
