import { Avatar, Grid } from '@mui/material';

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

  return (
    <Grid container component='li' xs={6} sm={4} direction='column' alignItems='center' p={2} gap={2}>
      <Avatar alt={firstName} src={photo} sx={{ width: '5rem', height: '5rem' }} />

      <h4>
        <span>{firstName}</span> {lastName}
      </h4>
      <h6>{role}</h6>

      <a href={git} target='_blank' rel='noreferrer'>
        Git
      </a>

      <ul>
        {contributions.map(({ text, id }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>

      <p>{bio}</p>
    </Grid>
  );
};

export default AboutItem;
