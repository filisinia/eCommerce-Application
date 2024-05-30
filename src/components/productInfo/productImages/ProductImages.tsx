import { useState } from 'react';

import { ImageList, ImageListItem } from '@mui/material';

import styles from 'components/productInfo/productImages/ProductImagesStyle';
import { IProduct } from 'types/products';

const ProductImages = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const { name } = productInfo.masterData.current || {};
  const imagesData = productInfo?.masterData.current.masterVariant.images;
  const imagesQuantity = imagesData.length;

  const [mainImageURL, setMainImageURL] = useState(imagesData[0].url);

  const mainImage = <img src={mainImageURL} style={styles.mainImage} alt={name['en-US']} />;
  const images = imagesData.map((imageData) => (
    <ImageListItem
      key={imageData.url}
      onClick={() => setMainImageURL(imageData.url)}
      sx={[styles.image, imageData.url === mainImageURL ? styles.selectedImage : {}]}
    >
      <img src={imageData.url} alt={name['en-US']} />
    </ImageListItem>
  ));

  return (
    <>
      {mainImage}
      <ImageList cols={imagesQuantity} gap={10} sx={styles.imageList}>
        {images}
      </ImageList>
    </>
  );
};

export default ProductImages;
