/* eslint-disable no-bitwise */
const gcd = (u: number, v: number): any => {
  if (u === v) return u;
  if (u === 0) return v;
  if (v === 0) return u;

  if (~u & 1)
    if (v & 1) return gcd(u >> 1, v);
    else return gcd(u >> 1, v >> 1) << 1;

  if (~v & 1) return gcd(u, v >> 1);

  if (u > v) return gcd((u - v) >> 1, v);

  return gcd((v - u) >> 1, u);
};

export const getMeta = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const GetAspectRatio = (w: number, h: number) => {
  const d = gcd(w, h);
  return [w / d, h / d];
};

export default GetAspectRatio;
