// import { SEEK_API_PATH, SEEK_API_SOCKET_PATH } from 'react-native-dotenv';
const SEEK_API_PATH = 'http://192.168.0.11:3000/api';
const SEEK_API_SOCKET_PATH = 'ws://192.168.0.11:3000';
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
    location: () => `${SEEK_API_PATH}/f/maps/location`,
    searchLocations: () => `${SEEK_API_PATH}/f/maps/search`,
    newChatSeen: () => `${SEEK_API_PATH}/f/newChatSeen`,
    fileUpload: (variant: string) => `${SEEK_API_PATH}/f/fileUpload/${variant}`,
    blockUser: () => `${SEEK_API_PATH}/f/blockUser`,
    unblockUser: () => `${SEEK_API_PATH}/f/unblockUser`,
    isUserBlocked: () => `${SEEK_API_PATH}/f/isUserBlocked`,
  },
  socket: (token: string) => `${SEEK_API_SOCKET_PATH}?auth=${token}`,
};

export default { seekApi };
