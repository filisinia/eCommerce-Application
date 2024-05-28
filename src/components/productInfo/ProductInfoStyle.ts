const ProductInfoStyle = {
  productImages: {
    mainImage: {
      width: '100%',
      border: '1px solid #d5d5d5',
    },

    imageItem: {
      maxWidth: '100px',
      aspectRatio: '1/1',
      border: '1px solid #d5d5d5',
    },

    imageList: {
      width: 'max-content',
      margin: '0 auto',
      justifyItems: 'center',
    },
  },

  productDescription: {
    descriptionBox: {
      margin: '0 auto',
      maxWidth: '600px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },

    name: {
      fontWeight: '600',
    },

    priceBox: {
      display: 'flex',
      gap: '25px',
    },
  },
};

export default ProductInfoStyle;
