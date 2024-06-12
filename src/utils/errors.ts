import { isAxiosError } from 'axios';

import { IFetchError } from 'types/errors';

export const catchFetchError = (e: unknown): string => {
  if (isAxiosError(e)) {
    const { response } = <IFetchError>e;

    return response.data.message;
  }

  return 'An unexpected error occurred';
};
