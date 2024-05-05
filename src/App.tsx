import { useState } from 'react';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Button from '@mui/material/Button';

import './styles/styles.scss';

const App = (): JSX.Element => {
  const [count, setCount] = useState(0);

  const handleSetCount = (): void => {
    setCount(count + 1);
  };

  return (
    <Button variant='contained' onClick={handleSetCount}>
      <AccessAlarmIcon />
      <span className='test'>Hello world</span>
    </Button>
  );
};

export default App;
