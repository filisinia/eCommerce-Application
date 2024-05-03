import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleSetCount = () => {
    setCount(count + 1);
    console.log(count);
  };
  return (
    <Button variant='contained' onClick={handleSetCount}>
      Hello world
    </Button>
  );
}

export default App;

