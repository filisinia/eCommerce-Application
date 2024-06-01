import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
}

const productInfoStore = create<IProductInfoState>()(
  devtools(
    persist(
      (set) => ({
        productInfo: null,
        isModalOpen: false,
        mainImageIndex: 0,
        modalImageIndex: 0,
        setProductInfo: (productInfo: IProduct | null) => set({ productInfo }),
        setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
        setMainImageIndex: (mainImageIndex: number) => set({ mainImageIndex }),
        setModalImageIndex: (modalImageIndex: number) => set({ modalImageIndex }),
      }),
      { name: 'productInfo' },
    ),
  ),
);

export default productInfoStore;
