export const getRGB = () => Math.floor(Math.random() * 256);
const rgbToHex = (r, g, b) =>
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

export const generateHex = () => {
  const color = {
    r: getRGB(),
    g: getRGB(),
    b: getRGB(),
  };
  return rgbToHex(color.r, color.g, color.b);
};
