import { useEffect, useRef, useState } from 'react';

import Carousel from 'components/productInfo/productImages/Carousel';
import CarouselModal from 'components/productInfo/productImages/CarouselModal';

const ProductImages = (): JSX.Element => {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      <Carousel
        type='carousel'
        {...{ mainImageIndex, modalImageIndex, setMainImageIndex, setModalImageIndex, ref: sliderRef }}
      />
      <CarouselModal
        {...{ isModalOpen, mainImageIndex, modalImageIndex, setIsModalOpen, setMainImageIndex, setModalImageIndex }}
      />
    </>
  );
};

export default ProductImages;
