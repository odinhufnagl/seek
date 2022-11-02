import { TOKEN_HEADER_KEY } from '../../constants';
import { SOCKET_PATH } from './constants';

const getSocket = (token: string) =>
  new WebSocket(SOCKET_PATH, undefined, { headers: { [TOKEN_HEADER_KEY]: token } });
export { getSocket };
