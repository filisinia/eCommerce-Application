import { ImageList, ImageListItem } from '@mui/material';

import ProductInfoStyle from 'components/productInfo/ProductInfoStyle';
import { IProduct } from 'types/products';

const ProductImages = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const imagesData = productInfo?.masterData.current.masterVariant.images;

  const mainImage = (
    <img
      src={imagesData[0].url}
      style={ProductInfoStyle.productImages.mainImage}
      alt={productInfo.masterData.current.name['en-US']}
    />
  );

  const images = imagesData.map((imageData, index) =>
    index === 0 ? null : (
      <ImageListItem key={imageData.url} sx={ProductInfoStyle.productImages.imageItem}>
        <img src={imageData.url} alt={productInfo.masterData.current.name['en-US']} />
      </ImageListItem>
    ),
  );

  return (
    <>
      {mainImage}
      <ImageList sx={{ width: '50%' }}>{images}</ImageList>
    </>
  );
};

export default ProductImages;
