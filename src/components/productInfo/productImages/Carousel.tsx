import { forwardRef, useContext } from 'react';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, ImageList, ImageListItem } from '@mui/material';

import styles from 'components/productInfo/productImages/CarouselStyle';
import productInfoContext from 'components/productInfo/ProductInfoContext';
import { ICarouselProps } from 'types/carousel';

const Carousel = forwardRef(
  (
    { type, mainImageIndex, modalImageIndex, setMainImageIndex, setModalImageIndex }: ICarouselProps,
    ref,
  ): JSX.Element | null => {
    const productInfo = useContext(productInfoContext);
    const masterData = productInfo?.masterData.current;

    if (!masterData) return null;

    const imagesData = masterData.masterVariant.images;
    const imagesQuantity = imagesData.length;
    const lastImageIndex = imagesQuantity - 1;
    let x1: number | null = null;

    const imageIndex = type === 'carousel' ? mainImageIndex : modalImageIndex;
    const setImageIndex = type === 'carousel' ? setMainImageIndex : setModalImageIndex;

    const showPrevImage = (): void => {
      const newImageIndex = imageIndex === 0 ? lastImageIndex : imageIndex - 1;

      setImageIndex(newImageIndex);
    };

    const showNextImage = (): void => {
      const newImageIndex = imageIndex === lastImageIndex ? 0 : imageIndex + 1;

      setImageIndex(newImageIndex);
    };

    const handleMouseDown = (e: React.MouseEvent): void => {
      x1 = e.clientX;
    };

    const handleTouchStart = (e: React.TouchEvent): void => {
      x1 = e.touches[0].clientX;
    };

    const handleSwipe = (x2: number): void => {
      if (x1 && x2 - x1 > 0) {
        showPrevImage();
      } else {
        showNextImage();
      }

      x1 = null;
    };

    const handleMouseMove = (e: React.MouseEvent): void => {
      if (!x1) return;

      const x2 = e.clientX;

      handleSwipe(x2);
    };

    const handleTouchMove = (e: React.TouchEvent): void => {
      if (!x1) return;

      const x2 = e.touches[0].clientX;

      handleSwipe(x2);
    };

    const imageWidthInPercent = 100;

    const sliderImages = imagesData.map((imageData) => (
      <Box key={imageData.url} sx={styles.slideImageBox}>
        <img src={imageData.url} alt={masterData.name['en-US']} style={styles.slideImage} />
      </Box>
    ));

    const images = imagesData.map((imageData, index) => (
      <ImageListItem
        key={imageData.url}
        onClick={() => setImageIndex(index)}
        sx={[styles.image, imageData.url === imagesData[imageIndex].url ? styles.selectedImage : {}]}
      >
        <img src={imageData.url} alt={masterData.name['en-US']} />
      </ImageListItem>
    ));

    return imagesQuantity === 1 ? (
      <Box>
        <img src={imagesData[0].url} alt={masterData.name['en-US']} key={imagesData[0].url} style={styles.slideImage} />
      </Box>
    ) : (
      <>
        <Box sx={styles.sliderBox}>
          <ArrowBackIos onClick={showPrevImage} sx={styles.arrow} />
          <Box ref={ref} sx={styles.slideImagesWrapper}>
            <Box
              component='section'
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              sx={{
                ...styles.slideImagesBox,
                transform: `translateX(-${imageWidthInPercent * imageIndex}%)`,
              }}
            >
              {sliderImages}
            </Box>
          </Box>
          <ArrowForwardIos onClick={showNextImage} sx={styles.arrow} />
        </Box>
        <ImageList cols={imagesQuantity} sx={styles.imageList}>
          {images}
        </ImageList>
      </>
    );
  },
);

Carousel.displayName = 'Carousel';

export default Carousel;
