const SEEK_API_PATH = 'https://seek-backend.onrender.com/api';
const SEEK_API_SOCKET_PATH = 'wss://seek-backend.onrender.com';

const seekApi = {
  database: {
    getOne: (table: string, id?: string | number) => `${SEEK_API_PATH}/${table}/${id}`,
    getPlural: (path: string[]) => `${SEEK_API_PATH}/${path.join('/')}`,
    post: (table: string) => `${SEEK_API_PATH}/${table}`,
    put: (table: string, id: string) => `${SEEK_API_PATH}/${table}/${id}`,
    delete: (table: string) => `${SEEK_API_PATH}/${table}`,
    getNewQuestion: (userId: string) => `${SEEK_API_PATH}/users/${userId}/questions/new`,
    getNewChat: (userId: string) => `${SEEK_API_PATH}/users/${userId}/chats/new`,
  },
  auth: {
    signIn: (table: string) => `${SEEK_API_PATH}/auth/${table}/signin`,
    signUp: (table: string) => `${SEEK_API_PATH}/auth/${table}/signup`,
    authenticate: (table: string) => `${SEEK_API_PATH}/auth/${table}/`,
  },
  functions: {
    search: () => `${SEEK_API_PATH}/f/search`,
    newChatSeen: () => `${SEEK_API_PATH}/f/newChatSeen`,
    fileUpload: () => `${SEEK_API_PATH}/f/fileUpload`,
  },
  socket: (token: string) => `${SEEK_API_SOCKET_PATH}?auth=${token}`,
};

export default { seekApi };
