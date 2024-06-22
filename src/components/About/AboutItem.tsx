import GitHubIcon from '@mui/icons-material/GitHub';
import { Avatar, Grid, IconButton, Box } from '@mui/material';

interface ITeamMember {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  role: string;
  git: string;
  bio: string;
  contributions: { text: string; id: number }[];
}

const AboutItem = ({ item }: { item: ITeamMember }): JSX.Element => {
  const { firstName, lastName, photo, role, git, bio, contributions } = item;

  const length = contributions.length - 1;

  return (
    <Grid container item component='li' sm={12} md={6} lg={4} direction='column' alignItems='center' p={2} gap={2}>
      <Avatar alt={firstName} src={photo} sx={{ width: '5rem', height: '5rem' }} />
      <h4 style={{ letterSpacing: '0.1rem' }}>
        <span>{firstName}</span> {lastName}
      </h4>

      <Box>
        <a href={git} target='_blank' rel='noreferrer'>
          <IconButton>
            <GitHubIcon />
          </IconButton>{' '}
        </a>
        <span color='rgb(255, 251, 0)'>{role}</span>
      </Box>

      <p style={{ textAlign: 'center', letterSpacing: '0.05rem' }}>
        <i> {bio}</i>
      </p>

      <h3>Contributions</h3>

      <ul
        style={{
          display: 'inline-flex',
          columnGap: '1rem',
          rowGap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {contributions.map(({ text, id }, i) => (
          <li key={id} style={{ color: '#1565c0' }}>
            {text} {i !== length && '|'}
          </li>
        ))}
      </ul>
    </Grid>
  );
};

export default AboutItem;
