import Button from '@/Button';
import Sample from '@/Sample';
import { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Sample onChange={(d) => console.log(d)} />
      <Button>dawdawdad</Button>
    </>
  );
};

export default App;
