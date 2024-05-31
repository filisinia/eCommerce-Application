import { useState } from 'react';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, ImageList, ImageListItem } from '@mui/material';

import styles from 'components/productInfo/productImages/ProductImagesStyle';
import { IProduct } from 'types/products';

const ProductImages = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const { name } = productInfo.masterData.current || {};
  const imagesData = productInfo?.masterData.current.masterVariant.images;
  const imagesQuantity = imagesData.length;
  const lastImageIndex = imagesQuantity - 1;

  const [mainImageIndex, setMainImageIndex] = useState(0);

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
        <Box sx={styles.slideImagesWrapper}>
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
