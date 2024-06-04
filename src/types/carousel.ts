export interface ICarouselProps {
  type: 'carousel' | 'modalCarousel';
  mainImageIndex: number;
  modalImageIndex: number;
  setMainImageIndex: (imageIndex: number) => void;
  setModalImageIndex: (imageIndex: number) => void;
}

export interface ICarouselModalProps extends Omit<ICarouselProps, 'type'> {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
