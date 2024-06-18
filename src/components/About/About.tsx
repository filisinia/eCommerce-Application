import { Grid, Typography } from '@mui/material';

// import icon from '../../assets/img/rs.svg';

import AboutItem from './AboutItem';

const team = [
  {
    id: 0,
    firstName: 'Mariia',
    lastName: 'Petrenko',
    photo: '/img/about/1.webp',
    role: 'Team lead',
    git: 'https://github.com/filisinia',
    bio: `I'm a front-end developer specializing in building web applications with React and TypeScript. I focus on delivering high-quality user experiences and writing clean, maintainable code. My goal is to achieve efficiency and excellence in every project, creating modern and visually appealing web solutions`,
    contributions: [
      { text: 'Repository Setup', id: 0 },
      { text: 'Task Board Setup', id: 1 },
      { text: 'Main Page Enhancements', id: 2 },
      { text: 'Routing Implementation', id: 3 },
      { text: 'Product Filtering and Searching', id: 4 },
      { text: 'Category Navigation', id: 5 },
      { text: 'Product Page', id: 6 },
      { text: 'Catalog Page', id: 7 },
      { text: 'Shopping Cart Integration', id: 8 },
    ],
  },
  {
    id: 1,
    firstName: 'Mykhailo',
    lastName: 'Nikolaiev',
    photo: '/img/about/3.webp',
    role: 'Developer',
    git: 'https://github.com/ab3mn',
    bio: `I'm a junior front-end developer`,
    contributions: [
      { text: 'Development Environment Configuration', id: 0 },
      { text: 'Development Scripts ', id: 1 },
      { text: 'Registration Page', id: 2 },
      { text: 'Product List and sorting', id: 3 },
      { text: 'Interactive Product Cards ', id: 4 },
      { text: 'Profile Page', id: 5 },
      { text: 'Routing Implementation', id: 6 },
      { text: 'Basket Page', id: 7 },
      { text: 'About Us Page', id: 8 },
    ],
  },
  {
    id: 2,
    firstName: 'Ilia',
    lastName: 'Ladin',
    photo: '/img/about/2.webp',
    role: 'Developer',
    git: 'https://github.com/reel-q',
    bio: `I'm a junior front-end developer`,
    contributions: [
      { text: 'CommerceTools Project and API Client Setup', id: 0 },
      { text: 'Comprehensive README', id: 1 },
      { text: 'Login Page', id: 2 },
    ],
  },
];

const About = (): JSX.Element => {
  const collaboration =
    'This project is a web application for eCommerce, developed using TypeScript, React, Material UI, and Zustand. It provides a basic structure for creating an online store with features such as browsing products, adding them to the cart, and completing the checkout process.';

  return (
    <>
      <main>
        <Grid container rowGap={5} alignItems='center' mt={2} mb={2} direction='column'>
          <Typography variant='h2' color='primary' sx={{ letterSpacing: '0.4rem' }}>
            About us
          </Typography>

          <Grid container justifyContent='center'>
            {team.map((item) => (
              <AboutItem key={item.id} item={item} />
            ))}
          </Grid>

          <p style={{ textAlign: 'center', letterSpacing: '0.05rem' }}>
            <i> {collaboration}</i>
          </p>
        </Grid>
      </main>
      <footer style={{ backgroundColor: 'black', width: '100%', padding: '2rem' }}>
        <a href='https://rs.school/' target='_blank' rel='noreferrer'>
          <img
            src='/img/icons/rs.svg'
            alt='RS Shool Icon'
            style={{
              width: '10rem',
              filter: 'invert(84%) sepia(24%) saturate(308%) hue-rotate(345deg)    brightness(104%) contrast(102%)',
            }}
          />
        </a>
      </footer>
    </>
  );
};

export default About;
