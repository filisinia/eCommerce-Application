import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EmpthyCart = (): JSX.Element => (
  <Box component='article' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <h2 style={{ margin: '2rem 0', textAlign: 'center' }}>The Cart is empty</h2>
    <div style={{ marginBottom: '2rem' }}>
      <img src='/img/shopping-cart.jpg' alt='shopping-cart' width={300} />
    </div>

    <Button
      component={Link}
      to='/products'
      style={{
        color: 'rgb(43, 40, 40)',
      }}
    >
      Go to the <span style={{ color: '#1565c0', fontWeight: 'bold', padding: '0 .2rem' }}> Products</span> page{' '}
    </Button>
  </Box>
);

export default EmpthyCart;
