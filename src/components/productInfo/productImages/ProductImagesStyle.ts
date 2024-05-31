const styles = {
  mainImage: {
    width: '100%',
  },

  image: {
    maxWidth: '100px',
    aspectRatio: '1/1',
  },

  selectedImage: {
    border: '2px solid #dfdfdf',
  },

  imageList: {
    width: 'max-content',
    margin: '0 auto',
    justifyItems: 'center',
  },

  arrow: {
    position: 'absolute',
    transition: 'scale 0.3s',
    fontSize: '40px',
    color: '#a7a7a7',
    top: '50%',

    '&:hover': {
      scale: '1.05',
    },
  },
};

export default styles;
