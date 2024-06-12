export interface IFetchError {
  response: {
    data: {
      errors: { code: string; message: string }[];
      message: string;
      statusCode: number;
    };
  };
}
