import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Button from '@mui/material/Button';

import './styles/styles.scss';
import { useStore, BearsState } from './zustand/state';

const Count = ({ count }: { count: number }): JSX.Element => <p>{count}</p>;

const App = (): JSX.Element => {
  const increasePopulation = useStore((state: BearsState) => state.increasePopulation);
  const bears = useStore((state: BearsState) => state.bears);

  return (
    <section>
      <Count count={bears} />{' '}
      <Button variant='contained' onClick={increasePopulation}>
        <AccessAlarmIcon />
        <span className='test'>Hello world</span>
      </Button>
    </section>
  );
};

export default App;
