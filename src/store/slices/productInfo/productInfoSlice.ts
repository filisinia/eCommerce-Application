import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IProduct } from 'types/products';

interface IProductInfoState {
  productInfo: IProduct | null;
  setProductInfo: (productInfo: IProduct | null) => void;
}

const productInfoStore = create<IProductInfoState>()(
  devtools(
    persist(
      (set) => ({
        productInfo: null,
        setProductInfo: (productInfo: IProduct | null) => set({ productInfo }),
      }),
      { name: 'productInfo' },
    ),
  ),
);

export default productInfoStore;
