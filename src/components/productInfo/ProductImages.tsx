import { ImageList, ImageListItem } from '@mui/material';

import ProductInfoStyle from 'components/productInfo/ProductInfoStyle';
import { IProduct } from 'types/products';

const ProductImages = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const { name } = productInfo.masterData.current || {};
  const imagesData = productInfo?.masterData.current.masterVariant.images;
  const imagesQuantity = imagesData.length;

  const mainImage = (
    <img src={imagesData[0].url} style={ProductInfoStyle.productImages.mainImage} alt={name['en-US']} />
  );

  const images = imagesData.map((imageData) => (
    <ImageListItem key={imageData.url} sx={ProductInfoStyle.productImages.imageItem}>
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
