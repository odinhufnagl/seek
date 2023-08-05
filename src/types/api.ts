// In many endpoints we want to be able to send Databaseoptions
// So this is a type that we can use in our apiFunctions
// Note that you could extend it to fit the exact apiFunction

type DBWhere<T> = {
  [K in keyof T]?: { unaryOperator?: string; value: T[K] };
};

export interface DBOptions<T = any> {
  where?: DBWhere<T>;
  sortBy?: string;
  offset?: number;
  limit?: number;
  fields?: string[];
  orderBy?: 'ASC' | 'DESC';
}
