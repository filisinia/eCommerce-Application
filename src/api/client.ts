import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { ctpClient } from 'api/clientBuilder';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.REACT_APP_API_PROJECT_KEY || '',
});

const getProject = (): Promise<unknown> => apiRoot.get().execute();

getProject().then(console.log).catch(console.error);
