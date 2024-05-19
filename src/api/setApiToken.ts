import axios from 'axios';

import { IApiTokenSuccess } from 'types/token';

const baseUrl = 'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials';

const setApiToken = async (): Promise<void> => {
  try {
    const res: IApiTokenSuccess = await axios.post(
      baseUrl,
      {},
      {
        auth: {
          username: 'pdKV37-QDhz87157SdnJ0s2-',
          password: 'TnuUqEcIBJgiL_u8lVwEMmQ2VT1Geqb8',
        },
      },
    );

    axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
  } catch (e) {
    console.log(e);
  }
};

export default setApiToken;
