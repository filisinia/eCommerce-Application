const styles = {
  container: {
    display: 'flex',
    gap: '15px',
    padding: '40px 0',
    userSelect: 'none',

    '@media (max-width: 780px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },

    '@media (max-width: 600px)': {
      padding: '40px 15px',
    },
  },

  imagesBox: {
    flex: '0 0 40%',
    maxWidth: '400px',
  },

  descriptionBox: {
    flexGrow: '1',
  },
};

export default styles;
