export const objectToQueryParams = (params: Record<any, any> | undefined): string => {
  if (!params) {
    return '';
  }
  return Object.keys(params)
    .map((key) => (params[key] === undefined ? '' : key + '=' + params[key]))
    .filter((s) => s !== '')
    .join('&');
};

export const extractPathValues = (url: string, matching: string): Record<string, string> => {
  const urlPaths = url.split('/');
  const matchingPaths = matching.split('/');
  const pathValues: Record<string, string> = {};
  matchingPaths.forEach((matchingPath, index) => {
    if (matchingPath[0] === ':') {
      pathValues[matchingPath.substring(1)] = urlPaths[index];
    }
  });

  return pathValues;
};
