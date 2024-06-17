import { Grid, Typography } from '@mui/material';

import AboutItem from './AboutItem';

const team = [
  {
    id: 0,
    firstName: 'Mariia',
    lastName: 'Petrenko',
    photo: '',
    role: 'Team lead',
    git: 'https://github.com/filisinia',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    contributions: [],
  },
  {
    id: 1,
    firstName: 'Mykhailo',
    lastName: 'Nikolaiev',
    photo: '',
    role: 'Developer',
    git: 'https://github.com/ab3mn',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    contributions: [],
  },
  {
    id: 2,
    firstName: 'Ilia',
    lastName: 'Ladin',
    photo: '',
    role: 'Developer',
    git: 'https://github.com/reel-q',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    contributions: [],
  },
];

const About = (): JSX.Element => {
  const collaboration =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <>
      {' '}
      <Grid container rowGap={5} alignItems='center' mt={2} direction='column'>
        <Typography variant='h3'>Our Team</Typography>

        <Grid container justifyContent='center'>
          {team.map((item) => (
            <AboutItem key={item.id} item={item} />
          ))}
        </Grid>

        <p>{collaboration}</p>
      </Grid>
      <footer style={{ backgroundColor: 'black', width: '100%' }}>
        <img src='' alt='' />
      </footer>
    </>
  );
};

export default About;
