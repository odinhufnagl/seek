import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ENDPOINTS, LOCAL_STORAGE } from '../constants';
import {
  DBOptions,
  Response,
  ResponseAuth,
  ResponseDBGetPlural,
  ResponseSignin,
  ResponseSignup,
} from '../types';
import { storageGet } from '../utils';
import { ApiError, NetworkError } from './errors';

type DBModelName = 'users' | 'chats' | 'messages' | 'userChats';
type AuthModelName = 'users';
type HttpMethod = 'post' | 'put' | 'get' | 'delete';
type HttpConfig = AxiosRequestConfig<any>;

export class ApiClient {
  private instance: () => Promise<AxiosInstance>;
  constructor() {
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
    config?: HttpConfig,
    params?: Record<string, any>,
  ): Promise<Response> => {
    try {
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
          console.log('throwing error');
          throw new ApiError(e.response.status, e?.response?.data?.error?.message);
        } else {
          throw new NetworkError(e.message);
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
    console.log('parsed', parsed);
    return parsed;
  };

  endpointDBModelName = (model: DBModelName): string =>
    ((
      {
        users: 'users',
        chats: 'chats',
        messages: 'messages',
        userChats: 'userChats',
      } as Record<DBModelName, string>
    )[model]);

  endpointAuthModelName = (model: AuthModelName): string =>
    (({ users: 'users' } as Record<AuthModelName, string>)[model]);

  dbGetOne = async <T>(
    model: DBModelName,
    id: string | number,
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
}
