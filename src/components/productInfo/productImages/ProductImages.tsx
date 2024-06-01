import { useEffect, useRef } from 'react';

import Carousel from 'components/productInfo/productImages/Carousel';
import CarouselModal from 'components/productInfo/productImages/CarouselModal';
import productInfoStore from 'store/slices/productInfo/productInfoSlice';

const ProductImages = (): JSX.Element => {
  const { setIsModalOpen, mainImageIndex, setModalImageIndex } = productInfoStore((state) => state);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const showModal = (): void => {
    setModalImageIndex(mainImageIndex);
    setIsModalOpen(true);
  };

  useEffect(() => {
    sliderRef.current?.addEventListener('click', showModal);

    return () => {
      sliderRef.current?.removeEventListener('click', showModal);
    };
  }, [mainImageIndex]);

  return (
    <>
      <Carousel type='carousel' ref={sliderRef} />
      <CarouselModal />
    </>
  );
};

export default ProductImages;
