import { useRef, useState, useEffect } from 'react';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, ImageList, ImageListItem } from '@mui/material';

import styles from 'components/productInfo/productImages/ProductImagesStyle';
import productInfoStore from 'store/slices/productInfo/productInfoSlice';
import notification from 'utils/notification';

const ProductImages = (): JSX.Element => {
  const { productInfo } = productInfoStore((state) => state);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const showModal = (): void => {
    console.log('show modal');
  };

  useEffect(() => {
    sliderRef?.current?.addEventListener('click', showModal);

    return () => {
      sliderRef?.current?.removeEventListener('click', showModal);
    };
  }, []);

  if (!productInfo) {
    notification('error', 'The product info was not provided');

    return <span>Error</span>;
  }

  const { name } = productInfo.masterData.current || {};
  const imagesData = productInfo?.masterData.current.masterVariant.images;
  const imagesQuantity = imagesData.length;
  const lastImageIndex = imagesQuantity - 1;

  const showPrevImage = (): void => {
    const newMainImageIndex = mainImageIndex === 0 ? lastImageIndex : mainImageIndex - 1;

    setMainImageIndex(newMainImageIndex);
  };

  const showNextImage = (): void => {
    const newMainImageIndex = mainImageIndex === lastImageIndex ? 0 : mainImageIndex + 1;

    setMainImageIndex(newMainImageIndex);
  };

  const imageWidthInPercent = 100;

  const sliderImages = imagesData.map((imageData) => (
    <img src={imageData.url} alt={name['en-US']} key={imageData.url} style={styles.slideImage} />
  ));

  const images = imagesData.map((imageData, index) => (
    <ImageListItem
      key={imageData.url}
      onClick={() => setMainImageIndex(index)}
      sx={[styles.image, imageData.url === imagesData[mainImageIndex].url ? styles.selectedImage : {}]}
    >
      <img src={imageData.url} alt={name['en-US']} />
    </ImageListItem>
  ));

  return imagesQuantity === 1 ? (
    <Box>
      <img src={imagesData[0].url} alt={name['en-US']} key={imagesData[0].url} style={styles.slideImage} />
    </Box>
  ) : (
    <>
      <Box sx={styles.sliderBox}>
        <ArrowBackIos onClick={showPrevImage} sx={styles.arrow} />
        <Box ref={sliderRef} sx={styles.slideImagesWrapper}>
          <Box
            sx={{
              ...styles.slideImagesBox,
              transform: `translateX(-${imageWidthInPercent * mainImageIndex}%)`,
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
};

export default ProductImages;
