export const objectToQueryParams = (params: Record<any, any> | undefined): string => {
  if (!params) {
    return '';
  }
  return Object.keys(params)
    .map((key) => (params[key] === undefined ? '' : key + '=' + params[key]))
    .filter((s) => s !== '')
    .join('&');
};
