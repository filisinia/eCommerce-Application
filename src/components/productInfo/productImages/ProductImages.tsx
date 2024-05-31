import { useState } from 'react';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, ImageList, ImageListItem } from '@mui/material';

import styles from 'components/productInfo/productImages/ProductImagesStyle';
import { IProduct } from 'types/products';

const ProductImages = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const { name } = productInfo.masterData.current || {};
  const imagesData = productInfo?.masterData.current.masterVariant.images;
  const imagesQuantity = imagesData.length;

  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrevClick = (): void => {
    const newMainImageIndex = mainImageIndex === 0 ? imagesQuantity - 1 : mainImageIndex - 1;

    setMainImageIndex(newMainImageIndex);
  };

  const handleNextClick = (): void => {
    const newMainImageIndex = mainImageIndex === imagesQuantity - 1 ? 0 : mainImageIndex + 1;

    setMainImageIndex(newMainImageIndex);
  };

  const mainImage = <img src={imagesData[mainImageIndex].url} style={styles.mainImage} alt={name['en-US']} />;
  const images = imagesData.map((imageData, index) => (
    <ImageListItem
      key={imageData.url}
      onClick={() => setMainImageIndex(index)}
      sx={[styles.image, imageData.url === imagesData[mainImageIndex].url ? styles.selectedImage : {}]}
    >
      <img src={imageData.url} alt={name['en-US']} />
    </ImageListItem>
  ));

  return (
    <>
      <Box>
        <ArrowBackIos onClick={handlePrevClick} sx={styles.arrow} />
        {mainImage}
        <ArrowForwardIos onClick={handleNextClick} sx={[styles.arrow, { transform: 'translateX(-80%)' }]} />
      </Box>
      <ImageList cols={imagesQuantity} sx={styles.imageList}>
        {images}
      </ImageList>
    </>
  );
};

export default ProductImages;
