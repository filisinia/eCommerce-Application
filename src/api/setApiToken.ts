import axios from 'axios';

import { IApiTokenSuccess } from 'types/token';
import notification from 'utils/notification';

const baseUrl = 'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials';

const username = process.env.REACT_APP_API_USERNAME || '';
const password = process.env.REACT_APP_API_PASSWORD || '';

const setApiToken = async (): Promise<void> => {
  try {
    const res: IApiTokenSuccess = await axios.post(baseUrl, {}, { auth: { username, password } });

    axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      notification('error', e.message);
    }
  }
};

export default setApiToken;
