import Button from '@/Button';
import Sample from '@/Sample';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

const App = () => {
  return (
    <>
      <Sample onChange={(d) => console.log(d)} />
      <Button className="btn">dawdawdad</Button>
    </>
  );
};

export default App;
