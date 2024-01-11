import Button from '@/Button';
import Sample from '@/Sample';
import { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Sample />
      <Button>dawdawdad</Button>
    </>
  );
}

export default App;
