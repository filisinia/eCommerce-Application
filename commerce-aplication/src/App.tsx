import Button from '@mui/material/Button';
import { useState } from 'react';
import './styles/styles.scss';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

function App() {
  const [count, setCount] = useState(0);

  const handleSetCount = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <>
      {' '}
      <Button variant='contained' onClick={handleSetCount}>
        <AccessAlarmIcon />
        <span className='test'> Hello world</span>
      </Button>
    </>
  );
}

export default App;

