import { Typography, Container } from '@mui/material';

const MainPage = (): JSX.Element => (
  <Container sx={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <img src='./img/main.jpg' alt='Store' width='100%' height='auto' style={{ maxHeight: '80vh' }} />
    <Typography variant='h6' textAlign='center' mb={2}>
      The discount code is <span style={{ color: '#1565c0', fontWeight: 'bold' }}>BOGO</span>
    </Typography>
    <section>
      <Typography fontSize='large' fontWeight={600}>
        Welcome to Home Harmony - Your Home for Stylish Living!
      </Typography>
      <Typography>
        At Home Harmony, we believe that every home should be a sanctuary of comfort and style. Our carefully curated
        collection of furniture and home decor items is designed to help you create spaces that reflect your personality
        and taste.
      </Typography>
    </section>
    <section>
      <Typography fontSize='large' fontWeight={600}>
        Explore our wide range of products:
      </Typography>
      <ol>
        <li style={{ listStyle: 'disc' }}>
          Sofas: From sleek modern designs to plush, cozy options, our sofas provide the perfect blend of comfort and
          elegance.
        </li>
        Tables: Discover dining tables, coffee tables, and side tables crafted to enhance any room with functionality
        and beauty.
        <li style={{ listStyle: 'disc' }}>
          Plates: Elevate your dining experience with our exquisite collection of plates, ranging from everyday
          essentials to unique statement pieces.
        </li>
        <li style={{ listStyle: 'disc' }}>
          Pictures: Add a touch of art to your walls with our selection of pictures and wall decor, perfect for creating
          inspiring and inviting spaces.
        </li>
      </ol>
    </section>
    <section>
      <Typography>
        Whether you are looking to revamp your living room, dining area, or any other part of your home, Home Harmony
        has everything you need to bring your vision to life. Our commitment to quality, style, and customer
        satisfaction ensures that you will find the perfect pieces to make your home truly yours.
      </Typography>
      <Typography>
        Visit us today and transform your home into a haven of comfort and style with Home Harmony!
      </Typography>
    </section>
  </Container>
);

export default MainPage;
