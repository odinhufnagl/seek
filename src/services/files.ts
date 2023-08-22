import RNFetchBlob from 'react-native-fetch-blob';

export const fetchLocalImageAsFile = async (imageUrl: string) => {
  try {
    const imageBlob = await RNFetchBlob.fs.readFile(imageUrl, 'base64');

    // Construct a Blob object from the base64 data
    const blob = new Blob([imageBlob], { type: 'image/png' });

    // Create a File-like object (you can customize the filename)
    const file = new File([blob], 'image.png', { type: 'image/png' });
    return file;
  } catch (error) {
    console.error('Error fetching local image:', error);
    return null;
  }
};
