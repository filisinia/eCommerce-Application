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
    contributions: [],
  },
  {
    id: 1,
    firstName: 'Mykhailo',
    lastName: 'Nikolaiev',
    photo: '/img/about/3.webp',
    role: 'Developer',
    git: 'https://github.com/ab3mn',
    bio: `I'm a junior front-end developer`,
    contributions: [],
  },
  {
    id: 2,
    firstName: 'Ilia',
    lastName: 'Ladin',
    photo: '/img/about/2.webp',
    role: 'Developer',
    git: 'https://github.com/reel-q',
    bio: `I'm a junior front-end developer`,
    contributions: [],
  },
];

const About = (): JSX.Element => {
  const collaboration =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <>
      <main>
        <Grid container rowGap={5} alignItems='center' mt={2} direction='column' sx={{ marginBottom: '1rem' }}>
          <Typography variant='h3'>Our Team</Typography>

          <Grid container justifyContent='center'>
            {team.map((item) => (
              <AboutItem key={item.id} item={item} />
            ))}
          </Grid>

          <p>{collaboration}</p>
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