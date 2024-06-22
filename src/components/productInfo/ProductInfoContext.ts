import { createContext } from 'react';

import { IProductInfo } from 'types/products';

const productInfoContext = createContext<IProductInfo | null>(null);

export default productInfoContext;
