import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ENDPOINTS, LOCAL_STORAGE } from '../constants';
import {
  DBOptions,
  FileInfo,
  Response,
  ResponseAuth,
  ResponseDBGetPlural,
  ResponseSearch,
  ResponseSignin,
  ResponseSignup,
} from '../types';
import { storageGet } from '../utils';
import { ApiError, NetworkError } from './errors';

type DBModelName = 'users' | 'chats' | 'messages' | 'userChats' | 'notificationTokens' | 'answers';
type AuthModelName = 'users';
type HttpMethod = 'post' | 'put' | 'get' | 'delete';
type FileUploadType = 'singleFile' | 'profileImage';
type HttpConfig = AxiosRequestConfig<any>;

export class ApiClient {
  private instance: () => Promise<AxiosInstance>;
  constructor() {
    // TODO: should be able to add to headers, like overrite content-type
    this.instance = async () => {
      const token = await storageGet(LOCAL_STORAGE.keys.userToken);
      return axios.create({
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${token}`,
        },
      });
    };
  }
  // TODO: throw errors
  // TODO: should not return "any", set up types for responsedata,
  // same for input

  fetch = async (
    method: HttpMethod,
    url: string,
    config?: any,
    params?: Record<string, any>,
  ): Promise<Response> => {
    try {
      // TODO: WHERE IS DATA?? RIGHT NOW CONFIG IS USED LIKE DATA OR SOMETHING LIKE THAT. look through this
      const res = await (
        await this.instance()
      )[method](url, {
        ...config,
        params,
      });

      if (!res) {
        throw Error();
      }
      return res as Response;
    } catch (e: any) {
      if (e instanceof AxiosError) {
        if (e.response) {
          throw new ApiError(
            e.response.status,
            e.response.data.error.errorCode,
            e?.response?.data?.error?.message,
          );
        } else {
          throw new NetworkError();
        }
      }
      throw Error();
    }
  };

  parseDBOptions = (options?: DBOptions): Record<string, any> => {
    if (!options) {
      return {};
    }
    const { sortBy, fields, limit, offset, where = {}, orderBy } = options;

    const parsedWhere: Record<string, string> = {};

    Object.values(where).forEach((v, index) => {
      if (v) {
        const { value, unaryOperator } = v;
        parsedWhere[Object.keys(where)[index]] = unaryOperator
          ? `${unaryOperator}:${value}`
          : value;
      }
    });
    const parsedSortBy = `${sortBy}.${orderBy === 'DESC' ? 'desc' : 'asc'}`;
    const parsed = {
      sort_by: sortBy ? parsedSortBy : undefined,
      fields: fields?.join(','),
      limit,
      offset,
      ...parsedWhere,
    };

    return parsed;
  };

  endpointDBModelName = (model: DBModelName): string =>
    ((
      {
        users: 'users',
        chats: 'chats',
        messages: 'messages',
        userChats: 'userChats',
        answers: 'answers',
        notificationTokens: 'notificationTokens',
      } as Record<DBModelName, string>
    )[model]);

  endpointAuthModelName = (model: AuthModelName): string =>
    (({ users: 'users' } as Record<AuthModelName, string>)[model]);

  dbGetOne = async <T>(
    model: DBModelName,
    id?: string | number,
    dbOptions?: DBOptions<T>,
  ): Promise<Response> =>
    await this.fetch(
      'get',
      ENDPOINTS.seekApi.database.getOne(this.endpointDBModelName(model), id),
      {},
      this.parseDBOptions(dbOptions),
    );

  dbGetPlural = async <T>(
    path: (DBModelName | string)[],
    dbOptions?: DBOptions<T>,
  ): Promise<ResponseDBGetPlural<T>> =>
    await this.fetch(
      'get',
      ENDPOINTS.seekApi.database.getPlural(path),
      {},
      this.parseDBOptions(dbOptions),
    );

  dbPost = async <T>(model: DBModelName, obj: any): Promise<Response> =>
    await this.fetch('post', ENDPOINTS.seekApi.database.post(this.endpointDBModelName(model)), obj);

  dbDelete = async <T>(model: DBModelName, dbOptions?: DBOptions<T>): Promise<Response> =>
    await this.fetch(
      'delete',
      ENDPOINTS.seekApi.database.delete(this.endpointDBModelName(model)),
      {},
      this.parseDBOptions(dbOptions),
    );

  dbPut = async <T>(model: DBModelName, id: number, obj: any): Promise<Response> =>
    await this.fetch(
      'put',
      ENDPOINTS.seekApi.database.put(this.endpointDBModelName(model), String(id)),
      obj,
    );

  authenticate = async (model: AuthModelName): Promise<ResponseAuth> =>
    this.fetch('get', ENDPOINTS.seekApi.auth.authenticate(this.endpointAuthModelName(model)));

  signUp = async (model: AuthModelName, obj: any): Promise<ResponseSignup> =>
    await this.fetch('post', ENDPOINTS.seekApi.auth.signUp(this.endpointAuthModelName(model)), obj);

  signIn = async (model: AuthModelName, obj: any): Promise<ResponseSignin> =>
    await this.fetch('post', ENDPOINTS.seekApi.auth.signIn(this.endpointAuthModelName(model)), obj);
  getNewQuestion = async (userId?: number): Promise<Response> =>
    await this.fetch('get', ENDPOINTS.seekApi.database.getNewQuestion(String(userId)));
  getNewChat = async (userId?: number): Promise<Response> =>
    await this.fetch('get', ENDPOINTS.seekApi.database.getNewChat(String(userId)));
  newChatSeen = async (userId: number, chatId: number): Promise<Response> =>
    await this.fetch('post', ENDPOINTS.seekApi.functions.newChatSeen(), { userId, chatId });
  blockUser = async (userToBlockId: number, userBlockingId: number): Promise<Response> =>
    await this.fetch('post', ENDPOINTS.seekApi.functions.blockUser(), {
      userBlockingId,
      userToBlockId,
    });
  unblockUser = async (userToBlockId: number, userBlockingId: number): Promise<Response> =>
    await this.fetch('post', ENDPOINTS.seekApi.functions.unblockUser(), {
      userBlockingId,
      userToBlockId,
    });
  isUserBlocked = async (userId: number, blockerId: number): Promise<Response> =>
    await this.fetch(
      'get',
      ENDPOINTS.seekApi.functions.isUserBlocked(),
      {},
      {
        userId,
        blockerId,
      },
    );
  fileUploadTypeToEndpointVariant = (type: FileUploadType): string =>
    ({
      singleFile: '',
      profileImage: 'profileImage',
    }[type]);
  fileUpload = async (file: FileInfo, type: FileUploadType = 'singleFile'): Promise<Response> => {
    const formData = new FormData();

    // Replace 'file' with the key you want to use on the server to access the file
    formData.append('file', file);

    const res = await axios.post(
      ENDPOINTS.seekApi.functions.fileUpload(this.fileUploadTypeToEndpointVariant(type)),
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return res;
  };
  search = async ({
    searchQuery,
    userId,
    limit,
    offset,
  }: {
    searchQuery: string;
    userId?: number;
    limit?: number;
    offset?: number;
  }): Promise<ResponseSearch> =>
    await this.fetch(
      'get',
      ENDPOINTS.seekApi.functions.search(),
      {},
      {
        userId,
        search_query: searchQuery,
        limit,
        offset,
      },
    );
}
Response;
