import axios from 'axios';

import { IApiToken } from 'types/token';

const baseUrl = 'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials';

const setApiToken = async (): Promise<void> => {
  try {
    const res: IApiToken = await axios.post(baseUrl, {});

    if (res) {
      console.log(res.access_token);
    }
  } catch (e) {
    console.log(e);
  }
};

export default setApiToken;
