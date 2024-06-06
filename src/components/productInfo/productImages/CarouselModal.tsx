import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from '@mui/material';

import Carousel from 'components/productInfo/productImages/Carousel';
import styles from 'components/productInfo/productImages/CarouselStyle';
import productInfoStore from 'store/slices/productInfo/productInfoSlice';

const CarouselModal = (): JSX.Element => {
  const { isModalOpen, setIsModalOpen, modalImageIndex, setMainImageIndex } = productInfoStore((state) => state);

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
        <Carousel type='modalCarousel' />
      </DialogContent>
    </Dialog>
  );
};

export default CarouselModal;
