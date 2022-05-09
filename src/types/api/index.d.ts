// eslint-disable-next-line @typescript-eslint/ban-types
export type TestResponse<T = {}> = Omit<request.Response, 'body'> & {
  body: T;
};
