const styles = {
  mainImageBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    minHeight: '400px',
  },

  mainImage: {
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
    width: 'max-content',
    margin: '0 auto',
    justifyItems: 'center',
  },

  arrow: {
    transition: 'scale 0.3s',
    fontSize: '35px',
    color: '#a7a7a7',
    cursor: 'pointer',

    '&:hover': {
      scale: '1.15',
    },
  },
};

export default styles;
