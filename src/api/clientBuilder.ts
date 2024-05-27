import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

const projectKey = process.env.REACT_APP_API_PROJECT_KEY || '';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_API_HOST || '',
  projectKey,
  credentials: {
    clientId: process.env.REACT_APP_API_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_API_CLIENT_SECRET || '',
  },
  scopes: [`manage_project:${projectKey}`] || [''],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_API_PROJECT_HOST || '',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
