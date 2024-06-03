import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IProduct } from 'types/products';

interface IProductInfoState {
  productInfo: IProduct | null;
  isModalOpen: boolean;
  mainImageIndex: number;
  modalImageIndex: number;
  setProductInfo: (productInfo: IProduct | null) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setMainImageIndex: (mainImageIndex: number) => void;
  setModalImageIndex: (modalImageIndex: number) => void;
  resetStore: () => void;
}

const initialState = {
  productInfo: null,
  isModalOpen: false,
  mainImageIndex: 0,
  modalImageIndex: 0,
};

const productInfoStore = create<IProductInfoState>()(
  devtools(
    (set) => ({
      ...initialState,
      setProductInfo: (productInfo: IProduct | null) => set({ productInfo }),
      setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
      setMainImageIndex: (mainImageIndex: number) => set({ mainImageIndex }),
      setModalImageIndex: (modalImageIndex: number) => set({ modalImageIndex }),
      resetStore: () => set(initialState),
    }),
    { name: 'productInfo' },
  ),
);

export default productInfoStore;
