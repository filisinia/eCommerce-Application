import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from '@mui/material';

import Carousel from 'components/productInfo/productImages/Carousel';
import styles from 'components/productInfo/productImages/CarouselStyle';
import { ICarouselModalProps } from 'types/carousel';

const CarouselModal = ({
  isModalOpen,
  mainImageIndex,
  modalImageIndex,
  setIsModalOpen,
  setMainImageIndex,
  setModalImageIndex,
}: ICarouselModalProps): JSX.Element => {
  const handleClose = (): void => {
    setMainImageIndex(modalImageIndex);
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <IconButton sx={styles.closeIcon} aria-label='close' onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Carousel
          type='modalCarousel'
          {...{ mainImageIndex, modalImageIndex, setMainImageIndex, setModalImageIndex }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CarouselModal;
