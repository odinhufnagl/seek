import { DBOptions, GetUsersOptions } from '../../../types';
import { objectToQueryParams } from '../../../utils';

const API_PATH = 'http://10.60.30.242:3000/api';

// In most endpoints the data we are given are DBOptions
// So this functions parse them so they look correct for the request

const DBOptionsToQueryParams = (params?: DBOptions) => {
  const { limit, offset, where, sortBy, orderBy } = params || {};
  const dbOptions = objectToQueryParams({
    limit,
    offset,
    sortBy,
    orderBy,
    ...where,
  });
  return dbOptions;
};

const API_ENDPOINT = {
  USERS: (options?: GetUsersOptions) => `${API_PATH}/users/?${DBOptionsToQueryParams(options)}`,
  USER: (id: number) => `${API_PATH}/users/${id}`,
};

export { API_ENDPOINT };
