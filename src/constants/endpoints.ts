const SEEK_API_PATH = 'http://10.60.30.242:3000/api';
const SEEK_API_SOCKET_PATH = 'ws://10.60.30.242:7071';

const seekApi = {
  database: {
    getOne: (table: string, id: string | number) => `${SEEK_API_PATH}/${table}/${id}`,
    getPlural: (path: string[]) => `${SEEK_API_PATH}/${path.join('/')}`,
    post: (table: string) => `${SEEK_API_PATH}/${table}`,
    put: (table: string, id: string) => `${SEEK_API_PATH}/${table}/${id}`,
    delete: (table: string) => `${SEEK_API_PATH}/${table}`,
  },
  auth: {
    signIn: (table: string) => `${SEEK_API_PATH}/auth/${table}/signin`,
    signUp: (table: string) => `${SEEK_API_PATH}/auth/${table}/signup`,
    authenticate: (table: string) => `${SEEK_API_PATH}/auth/${table}/`,
  },
  functions: {},
  socket: (token: string) => `${SEEK_API_SOCKET_PATH}/auth=${token}`,
};

export default { seekApi };
