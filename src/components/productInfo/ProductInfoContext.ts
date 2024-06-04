import { createContext } from 'react';

import { IProduct } from 'types/products';

const productInfoContext = createContext<IProduct | null>(null);

export default productInfoContext;
