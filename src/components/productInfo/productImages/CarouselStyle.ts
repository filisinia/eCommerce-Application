const styles = {
  sliderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    minHeight: '400px',
    overflow: 'hidden',
  },

  slideImagesWrapper: {
    width: '100%',
    overflow: 'hidden',
  },

  slideImagesBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    transition: 'transform 0.3s ease-in-out',
  },

  slideImage: {
    width: '100%',
    cursor: 'pointer',
  },

  image: {
    maxWidth: '100px',
    aspectRatio: '1/1',
    cursor: 'pointer',
  },

  selectedImage: {
    border: '3px solid #dfdfdf',
  },

  imageList: {
    margin: '0 auto',
    justifyItems: 'center',
    alignItems: 'stretch',
    width: 'fit-content',
  },

  arrow: {
    transition: 'scale 0.3s',
    fontSize: '35px',
    color: '#a7a7a7',
    cursor: 'pointer',

    '&:hover': {
      scale: '1.15',
    },

    '@media (max-width: 468px)': {
      display: 'none',
    },
  },

  closeIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
  },
};

export default styles;
