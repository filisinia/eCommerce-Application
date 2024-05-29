import { useState } from 'react';

import { ImageList, ImageListItem } from '@mui/material';

import ProductInfoStyle from 'components/productInfo/ProductInfoStyle';
import { IProduct } from 'types/products';

const ProductImages = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const { name } = productInfo.masterData.current || {};
  const imagesData = productInfo?.masterData.current.masterVariant.images;
  const imagesQuantity = imagesData.length;

  const [mainImageURL, setMainImageURL] = useState(imagesData[0].url);

  const mainImage = <img src={mainImageURL} style={ProductInfoStyle.productImages.mainImage} alt={name['en-US']} />;
  const images = imagesData.map((imageData) => (
    <ImageListItem
      key={imageData.url}
      onClick={() => setMainImageURL(imageData.url)}
      sx={[
        ProductInfoStyle.productImages.imageItem,
        imageData.url === mainImageURL ? ProductInfoStyle.productImages.imageSelectedItem : {},
      ]}
    >
      <img src={imageData.url} alt={name['en-US']} />
    </ImageListItem>
  ));

  return (
    <>
      {mainImage}
      <ImageList cols={imagesQuantity} gap={10} sx={ProductInfoStyle.productImages.imageList}>
        {images}
      </ImageList>
    </>
  );
};

export default ProductImages;
